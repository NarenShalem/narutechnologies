var app = angular.module('app',['ui.router',require('angular-sqlite')]);
 // naru is the name of my database
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
       $stateProvider
           .state('login', {
               url: '/',
               templateUrl: 'login.html',
               controller: 'loginController'
               
           })
            .state('forgot', {
               url: '/',
               templateUrl: 'reset-password.html',
               controller: 'resetController'
               
           })
           .state('register', {
               url: '/register',
               templateUrl: 'newcustomer.html',
               controller: 'regisController'
               
           })
           .state('home', {
               url: '/home',
               templateUrl: 'home.html',
               controller: 'homeController'
             
           })
            .state('todo', {
               url: '/todo',
               templateUrl: 'todo.html',
               controller: 'todoController'
             
           })
             .state('todocustomer', {
               url: '/todocustomer',
               templateUrl: 'todocustomer.html',
               controller: 'todocustomerController'
             
           })
            .state('profile', {
               url: '/profile',
               templateUrl: 'profile.html',
               controller: 'profileController'
               
           });
    
});

app.constant('DB_CONFIG',{
        Customer_reg: { 
            id:{type:'integer',null:false},
            first_name:{ type: 'text', null:true }, 
            last_name:{ type: 'text', null:true },
            email:{ type: 'text', null: true},
            password: { type: 'text', null: true },
            phoneNumber: { type: 'text', null: true},
            gender:{ type: 'text', null: true}
        },
        login:{
            id:{type:'integer',null:false},
            first_name:{ type: 'text', null:true }, 
            last_name:{ type: 'text', null:true },
            email:{ type: 'text', null: true},
            password: { type: 'text', null: true },
            phoneNumber: { type: 'text', null: false},
            gender:{ type: 'text', null: true}
        },
        todo:{
          id:{type:'integer', null:false},
          NetworkName:{type:'text',null:false},
          state:{type:'text',null:false},
          Amount:{type:'integer', null:false}
        }
       
    })
    .run(function ($SQLite) {
        $SQLite.dbConfig({
            name: 'my-db321',
            description: 'creating mydb',
            version: '1.0'
        });
    })
    .run(function ($SQLite, DB_CONFIG) {
        $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                init.step();
                $SQLite.createTable(name, config).then(init.done);
               
            });
            init.finish();
        });
  
    });

app.controller('regisController',function ($scope,$location,$state,$SQLite){

$scope.insert=function(customer){

$SQLite.ready(function (){
        this.insert('Customer_reg',customer) 
        // .then(onResult,onError)
        //     onResult.first_name
        //     onResult.last_name
        //.then(onResult, onError)  .then(onResult,onErr
        $state.go("login");
    });
}
});
app.controller('loginController',function($scope,$state,$SQLite){
  $scope.loginVal=function(email,password){
     $SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM Customer_reg')
            .then(
        function () { 
            console.log('Empty Result!');
             },
        function () {
      //  console.err('Error!');
          },
        function (data) {
   //                // Result! 
    for(var i=0;i<data.rows.length;i++){
   if(email==data.rows[i].email && password==data.rows[i].password){
    var login=data.rows[i];
          $SQLite.insert('login', login) 
          console.log(data.rows);
          // data.count 
          // data.result 
          $state.go("home");
        }
      }
    }
      );
    });
  }             
});
app.controller('profileController',function($scope,$state,$SQLite){
   $SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM login')
            .then(
        function () { 
            console.log('Empty Result!');
             },
        function () {
      //  console.err('Error!');
          },
        function (data) {
   //                // Result! 
    for(var i=0;i<data.rows.length;i++){
          console.log(data.rows);
          var customer=data.rows[i];
          $scope.customer=customer;
          // data.count 
          // data.result 
         // $state.go("home");
        
      }
    }
      );
    });

$scope.updateCustomer=function(customer){

  $state.go("home");
   }

});
app.controller('todoController',function($scope,$state,$SQLite){
  
  $scope.todoinsertCustomer=function(){


  }

});
app.controller('todocustomerController',function($scope,$state,$SQLite){
  
  $scope.todoinsertCustomer=function(){


  }

});

 app.controller('homeController',['$scope','$location',function($scope,$location){
 $scope.logout=function(){
 
 $location.path("/");
}
}]);
