import { CommentDoc, CommentField, LastDoc } from "./types";
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';

async function createComment(comment: CommentDoc) {
  const result = await firestore()
    .collection('comments')
    .add({
      ...comment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })

  return {
    id: result.id,
    ...(await result.get()).data(),
  } as CommentDoc;
}


async function getRootComments(lastDoc: LastDoc<CommentDoc>) {
  let query = firestore()
    .collection('comments')
    .where('parentIdIsNull', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(10);

  if (lastDoc.current) {
    query = query.startAfter(lastDoc.current);
  }
  const result = await query.get();
  if(result.docs.length === 0) return [];

  lastDoc.current = result.docs[result.docs.length - 1];
  const comments = await result.docs.map(async (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      childLength: await (async () => {
        const query = firestore().collection('comments').orderBy('createdAt', 'desc').where('parentId', '==', doc.id);
        const snapshot = await getCountFromServer(query);
        return snapshot.data().count;
      })(),
    } as CommentField;
  });
  return await Promise.all(comments)
}






async function getComments(parentId: string, lastDoc: LastDoc<CommentDoc>) {
  let query = firestore()
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .where('parentId', '==', parentId)
    .limit(5);

  if (lastDoc.current) {
    query = query.startAfter(lastDoc.current);
  }

  const result = await query.get();
  if(result.docs.length === 0) return [];

  lastDoc.current = result.docs[result.docs.length - 1];
  const comments = await result.docs.map(async (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      childLength: await (async () => {
        const query = firestore().collection('comments').where('parentId', '==', doc.id);
        const snapshot = await getCountFromServer(query);
        return snapshot.data().count;
      })(),
    } as CommentField;
  });
  return await Promise.all(comments);
}


export const experience = {
  getComments,
  createComment,
  getRootComments,
}