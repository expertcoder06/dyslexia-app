# **App Name**: LexiLearn

## Core Features:

- Spellbee Game: Interactive game to spell dyslexia-relevant words, providing audio feedback using the Web Speech API for pronunciation.
- Letter Tracing Game: Matching game using Speech-to-Text to identify confusable letters/words spoken by the user.
- Artwork Matching: Compare the similarity between an uploaded image and a target using TensorFlow.js to calculate the Cosine Similarity Score.
- AI Storytelling: Generates a story summary and scrambles key events for the user to sequence correctly. Summary is read aloud with text-to-speech (TTS). Powered by a simulated AI flow tool.
- AI Buddy: Uses facial emotion detection (face-api.js) to track user emotion and provide personalized cheering messages from an AI flow tool, gamified through Firestore score updates and visual rewards upon happiness detection.
- Firestore Persistence: Saves user progress, scores, and rewards.

## Style Guidelines:

- Primary color: Soft lavender (#E6E6FA) for a calming and friendly learning environment.
- Background color: Very light grayish-lavender (#F5F5FF).
- Accent color: Muted blue (#B0E2FF) to highlight interactive elements and CTAs, ensuring high contrast with text.
- Body and headline font: 'PT Sans' for a modern yet warm and readable feel, suitable for users with dyslexia. 
- Simulate OpenDyslexic via CSS for key text fields, if the user chooses
- Use clear, simple icons with sufficient contrast. For example, reward "gems"
- Responsive layout with dyslexia-friendly spacing between elements to reduce visual crowding.
- Subtle animations for feedback and rewards, avoiding fast or distracting movements.