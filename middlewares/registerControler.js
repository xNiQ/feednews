module.exports = function checkCredentials(login,password,nickname) {
    if(login && password && nickname) {
        return true;
    } else {
        return false;
    }
};