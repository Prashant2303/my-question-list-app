const extensionId = 'iemohgfmjpnglpbpkkhlcananlofnfid';

export const chromeMessages = {
    loginUser: (userData) => {
        try {
            chrome.runtime.sendMessage(extensionId, {
                action: "LOGIN",
                userData
            }, function (res) {
                console.log('MSG RESPONSE', res);
            })
        } catch (err) {
            console.log(err);
        }
    },
    updateUser: (updatedUser) => {
        try {
            chrome.runtime.sendMessage(extensionId, {
                action: "UPDATE",
                userData: updatedUser
            }, function (res) {
                console.log('MSG RESPONSE', res);
            })
        } catch (err) {
            console.log(err);
        }
    },
    logoutUser: () => {
        try {
            chrome.runtime.sendMessage(extensionId, {
                action: "LOGOUT"
            }, function (res) {
                console.log('MSG RESPONSE', res);
            })
        } catch (err) {
            console.log(err);
        }
    }
}