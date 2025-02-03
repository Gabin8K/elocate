import { CommentDoc, CommentField } from "./types";
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


async function getRootComments(lastDoc?: any) {
  let query = firestore()
    .collection('comments')
    .where('parentId', '==', null)
    .orderBy('createdAt', 'desc');

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }
  const result = await query.limit(5).get();
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
  return await Promise.all(comments);
}






async function getComments(parentId: string, lastDoc?: any) {
  let query = firestore()
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .where('parentId', '==', parentId);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }
  const result = await query.limit(5).get();
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