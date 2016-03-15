'use strict';
//var fb = new Firebase('https://cleanapps.firebaseio.com/orders');

/* Controllers */

app.controller('Table', ["$scope", "$firebaseObject", '$firebase', function($scope, $firebaseObject) {
    // create a synchronized array with a customized version

    var ref = new Firebase('https://cleanapps.firebaseio.com/orders');
    var obj = $firebaseObject(ref);
    $scope.phones = []

    // ref.on("value", function(snapshot) {
    //     $scope.phones.push(snapshot.val());
    // }, function(errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });
    ref.on("child_added", function(snapshot) {
        var newPost = snapshot.val();
        $scope.phones.push(newPost)
    });

    // to take an action after the data loads, use the $loaded() promise

    $scope.confirm = function(id) {
        var idRef = ref.child(id)
        idRef.update({
            "status": "Выполнен"
        });
    }
    ref.on("child_changed", function(snapshot) {
        var changedPost = snapshot.val();
        console.log(changedPost)
        arr.forEach(function(item, i, arr) {
            alert(i + ": " + item + " (массив:" + arr + ")");
        });
    });

}]);
app.controller('ChatsCtrl', ['$scope', '$firebase', '$firebaseArray', '$rootScope', function($scope, $firebase, $firebaseArray, $rootScope) {
    var messagesRef = new Firebase("https://cleanapps.firebaseio.com/message");

    $scope.user = "Guest " + Math.round(Math.random() * 100);

    $scope.chats = $firebaseArray(messagesRef);
    var query = messagesRef.orderByChild("date").limitToLast(25);
    $scope.filteredMessages = $firebaseArray(query);


    console.log($scope.chats)

    $scope.sendChat = function(chat) {
        $scope.chats.$add({
            author: $scope.user,
            message: chat.message,
            date: Firebase.ServerValue.TIMESTAMP
        });
        chat.message = "";
    }

}])
app.controller("calendar", ["$scope", "$firebaseObject", function($scope, $firebaseObject) {}]);
app.controller("mailbox", ["$scope", "$firebaseObject", function($scope, $firebaseObject) {}]);
app.controller("register", ["$scope", "$firebaseObject", function($scope, $firebaseObject) {}]);
app.controller("login", ["$scope", "$firebaseObject", function($scope, $firebaseObject) {
    $scope.submit = function() {
        console.log($scope.email + $scope.password);
        var ref = new Firebase("https://cleanapps.firebaseio.com");
        ref.authWithPassword({
            email: $scope.email,
            password: $scope.password
        }, function(error, authData) {
            if (error) {
                alert("Login Failed!");
            } else {
                console.log('ok');
                document.location.href = '#/table';
            }
        });
    }
}]);