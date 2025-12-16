"""
Smart Context-Aware Gift Recommendation Engine
NO random results – Human-like logic
"""
from typing import List, Dict, Any, Tuple

def normalize(text: str) -> str:
    """Safely normalizes text for comparison."""
    return (text or '').lower().strip()


def smart_score(gift: Any, criteria: Dict[str, Any]) -> Tuple[float, Dict[str, Any]]:
    score = 0
    details = {}

    # =========================
    # INTERESTS (30%)
    # =========================
    user_interests = set(map(normalize, criteria.get('interests', [])))
    gift_interests_raw = getattr(gift, 'interests', [])
    gift_interests = set(map(normalize, gift_interests_raw or []))

    # 🛑 الإصلاح: تعيين قيمة افتراضية لـ common (مجموعة فارغة)
    common: set = set() 

    if user_interests:
        common = user_interests & gift_interests
        interest_score = len(common) / len(user_interests)
    else:
        interest_score = 0.6 # Neutral score if user provides no interests

    score += interest_score * 30
    details['interest'] = round(interest_score * 100)
    # 🌟 الآن أصبح استخدام common آمناً
    details['common_interests'] = list(common) 

    # =========================
    # PERSONALITY (20%)
    # =========================
    user_personality = normalize(criteria.get('personality_type'))
    gift_personality = normalize(getattr(gift, 'personality_type', ''))

    if not user_personality or not gift_personality:
        personality_score = 0.6
    elif user_personality in gift_personality or gift_personality in user_personality:
        personality_score = 1
    else:
        personality_score = 0.4

    score += personality_score * 20
    details['personality'] = round(personality_score * 100)

    # =========================
    # OCCASION (20%)
    # =========================
    user_occasion = normalize(criteria.get('occasion'))
    gift_occasion = normalize(getattr(gift, 'occasion', ''))

    if not user_occasion:
        occasion_score = 0.7
    elif user_occasion == gift_occasion:
        occasion_score = 1
    elif gift_occasion in ['general', 'any']:
        occasion_score = 0.7
    else:
        occasion_score = 0.4

    score += occasion_score * 20
    details['occasion'] = round(occasion_score * 100)

    # =========================
    # AGE (15%)
    # =========================
    age = criteria.get('age')
    min_age = getattr(gift, 'min_age', 0)
    max_age = getattr(gift, 'max_age', 100)

    if age is None:
        age_score = 0.6
    elif min_age <= age <= max_age:
        age_score = 1
    else:
        diff = min(abs(age - min_age), abs(age - max_age))
        age_score = max(0.4, 1 - diff / 20)

    score += age_score * 15
    details['age'] = round(age_score * 100)

    # =========================
    # BUDGET (15%)
    # =========================
    budget = criteria.get('budget')
    min_budget = getattr(gift, 'min_budget', 0)
    max_budget = getattr(gift, 'max_budget', float('inf'))

    if budget is None:
        budget_score = 0.6
    elif min_budget <= budget <= max_budget:
        budget_score = 1
    else:
        if budget < min_budget:
            diff = min_budget - budget
            penalty_base = min_budget if min_budget > 0 else 1 
            budget_score = max(0.4, 1 - diff / penalty_base)
        else:
            diff = budget - max_budget
            budget_score = max(0.4, 1 - diff / 100)

    score += budget_score * 15
    details['budget'] = round(budget_score * 100)

    details['total_score'] = round(score, 1)
    return score, details


def get_recommendations(gifts: List[Any], criteria: Dict[str, Any], limit: int = 4) -> List[Dict[str, Any]]:
    """
    Get top gift recommendations based on criteria, limited to the best 4.
    """
    results = []

    for gift in gifts:
        try:
            # 🛑 هذا هو الاستدعاء الذي يسبب المشكلة، لكن تم إصلاحها الآن داخل smart_score
            score, details = smart_score(gift, criteria) 
            results.append({
                'gift': getattr(gift, 'to_dict', lambda: gift)(),
                'score': round(score / 100, 2),
                'match_details': details
            })
        except Exception as e:
            # يمكن طباعة الخطأ هنا للمراجعة إذا استمرت الأخطاء
            # print(f"Error processing gift: {e}")
            continue

    results.sort(key=lambda x: x['score'], reverse=True)

    return results[:limit]
