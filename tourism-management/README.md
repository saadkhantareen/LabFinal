# Tourism Management API

A RESTful API for managing tourist attractions, visitors, and reviews. This system helps track various attractions, allows visitors to post reviews, and manages ratings based on visitor feedback.

## Features

- Manage tourist attractions with entry fees and ratings
- Track visitors and their visited attractions
- Handle review system with validation rules
- Prevent duplicate reviews from same visitor
- Ensure visitors can only review attractions they've visited

## API Endpoints

### Attractions
- `POST /api/attractions` - Create new attraction
- `GET /api/attractions` - Get all attractions
- `GET /api/attractions/:id` - Get single attraction

### Visitors
- `POST /api/visitors` - Register new visitor
- `GET /api/visitors` - Get all visitors
- `PUT /api/visitors/:id` - Update visitor information

### Reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/attraction/:attractionId` - Get reviews for specific attraction

## Data Models

### Attraction
- name (required)
- location (required)
- entryFee (required, must be ≥ 0)
- rating (0-5, default: 0)

### Visitor
- name (required)
- email (required, unique, validated)
- visitedAttractions (array of attraction references)

### Review
- attraction (reference, required)
- visitor (reference, required)
- score (1-5, required)
- comment (optional)

## Setup

1. Install dependencies:
```bash
