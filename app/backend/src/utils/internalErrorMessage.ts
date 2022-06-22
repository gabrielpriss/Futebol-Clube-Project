export default function errorVerify(e: unknown) {
  let message: string;
  if (e instanceof Error) {
    message = e.message;
  } else if (typeof e === 'string') {
    message = e;
  } else {
    message = 'Some internal error happened';
  }

  return ({
    type: 'internalServicerError',
    message,
  });
}
