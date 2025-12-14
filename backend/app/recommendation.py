"""
Enhanced Gift Recommendation Algorithm
Uses multiple criteria for precise matching
"""

def calculate_recommendation_score(gift, criteria):
    """
    Calculate match score for a gift based on user criteria
    
    Scoring weights:
    - Age match: 20%
    - Budget match: 25%
    - Interests match: 25%
    - Gender match: 10%
    - Occasion match: 10%
    - Personality match: 10%
    
    Returns score between 0 and 1
    """
    total_score = 0
    weights = {
        'age': 0.20,
        'budget': 0.25,
        'interests': 0.25,
        'gender': 0.10,
        'occasion': 0.10,
        'personality': 0.10
    }
    
    match_details = {}
    
    # 1. Age matching (20%)
    user_age = criteria.get('age', 0)
    if gift.min_age <= user_age <= gift.max_age:
        age_score = 1.0
    else:
        # Partial score if close
        if user_age < gift.min_age:
            diff = gift.min_age - user_age
        else:
            diff = user_age - gift.max_age
        age_score = max(0, 1 - (diff / 10))  # Decrease by distance
    
    total_score += age_score * weights['age']
    match_details['age_match'] = round(age_score * 100, 1)
    
    # 2. Budget matching (25%)
    user_budget = criteria.get('budget', 0)
    if gift.min_budget <= user_budget <= gift.max_budget:
        budget_score = 1.0
    else:
        # Partial score if close
        if user_budget < gift.min_budget:
            diff = gift.min_budget - user_budget
            budget_score = max(0, 1 - (diff / user_budget)) if user_budget > 0 else 0
        else:
            diff = user_budget - gift.max_budget
            budget_score = max(0, 1 - (diff / 100))
    
    total_score += budget_score * weights['budget']
    match_details['budget_match'] = round(budget_score * 100, 1)
    
    # 3. Interests matching (25%)
    user_interests = set(criteria.get('interests', []))
    gift_interests = set(gift.interests)
    
    if user_interests and gift_interests:
        common_interests = user_interests.intersection(gift_interests)
        interests_score = len(common_interests) / len(user_interests)
    else:
        interests_score = 0.5  # Neutral if no interests specified
    
    total_score += interests_score * weights['interests']
    match_details['interests_match'] = round(interests_score * 100, 1)
    match_details['common_interests'] = list(user_interests.intersection(gift_interests))
    
    # 4. Gender matching (10%)
    user_gender = criteria.get('gender', '').lower()
    gift_gender = (gift.gender or 'unisex').lower()
    
    if gift_gender == 'unisex':
        gender_score = 1.0
    elif user_gender == gift_gender:
        gender_score = 1.0
    else:
        gender_score = 0.3  # Small penalty for mismatch
    
    total_score += gender_score * weights['gender']
    match_details['gender_match'] = round(gender_score * 100, 1)
    
    # 5. Occasion matching (10%)
    user_occasion = criteria.get('occasion', '').lower()
    gift_occasion = (gift.occasion or '').lower()
    
    if not user_occasion or not gift_occasion:
        occasion_score = 0.7  # Neutral if not specified
    elif user_occasion == gift_occasion:
        occasion_score = 1.0
    elif 'any' in gift_occasion or 'general' in gift_occasion:
        occasion_score = 0.8
    else:
        occasion_score = 0.3
    
    total_score += occasion_score * weights['occasion']
    match_details['occasion_match'] = round(occasion_score * 100, 1)
    
    # 6. Personality matching (10%)
    user_personality = criteria.get('personality_type', '').lower()
    gift_personality = (gift.personality_type or '').lower()
    
    if not user_personality or not gift_personality:
        personality_score = 0.7  # Neutral if not specified
    elif user_personality in gift_personality or gift_personality in user_personality:
        personality_score = 1.0
    else:
        personality_score = 0.3
    
    total_score += personality_score * weights['personality']
    match_details['personality_match'] = round(personality_score * 100, 1)
    
    match_details['total_score'] = round(total_score * 100, 1)
    
    return total_score, match_details


def get_recommendations(gifts, criteria, limit=20):
    """
    Get top gift recommendations based on criteria
    
    Args:
        gifts: List of Gift objects
        criteria: Dict with user criteria (age, budget, interests, etc.)
        limit: Maximum number of recommendations to return
    
    Returns:
        List of dicts with gift and score information
    """
    recommendations = []
    
    for gift in gifts:
        score, match_details = calculate_recommendation_score(gift, criteria)
        
        # Only include if score is above threshold
        if score >= 0.2:  # At least 20% match
            recommendations.append({
                'gift': gift.to_dict(),
                'score': round(score, 3),
                'match_details': match_details
            })
    
    # Sort by score (highest first)
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    
    return recommendations[:limit]
