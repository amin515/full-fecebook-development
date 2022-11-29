
// create custom error
const customError = (status, msg) => {

    const err = new Error();
    err.status = status;
    err.message = msg;
    return err;
}

export default customError;