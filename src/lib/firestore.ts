import { doc, setDoc, getDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

const APP_ID = 'lexilearn';

export async function updateUserScore(userId: string, newGems: number) {
  if (!userId) return;

  const userProgressRef = doc(db, `artifacts/${APP_ID}/users/${userId}/progress`);

  try {
    await setDoc(userProgressRef, { 
      score: increment(newGems),
      lastUpdated: new Date(),
    }, { merge: true });
    
    console.log(`Score updated for user ${userId}`);
  } catch (error) {
    console.error("Error updating score: ", error);
  }
}

export async function getUserScore(userId: string): Promise<number> {
    if (!userId) return 0;

    const userProgressRef = doc(db, `artifacts/${APP_ID}/users/${userId}/progress`);
    try {
        const docSnap = await getDoc(userProgressRef);
        if (docSnap.exists()) {
            return docSnap.data().score || 0;
        }
        return 0;
    } catch (error) {
        console.error("Error fetching score: ", error);
        return 0;
    }
}
