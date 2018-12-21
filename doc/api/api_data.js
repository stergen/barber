define({ "api": [  {    "type": "post",    "url": "/users",    "title": "Create user",    "name": "CreateUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>User firstname.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phone",            "description": "<p>User phone number.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Bool",            "optional": false,            "field": "auth",            "description": ""          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>User token.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 400": [          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't process your request</p>"          }        ],        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't create User</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "delete",    "url": "/users/:id",    "title": "Delete User information",    "name": "DeleteUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Information</p>"          }        ]      }    },    "error": {      "fields": {        "Error 404": [          {            "group": "Error 404",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Can't find User with <code>id</code></p>"          }        ],        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't delete User</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "/users/me",    "title": "Get current User information",    "name": "GetCurrentUser",    "group": "Users",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "name",            "description": "<p>User full name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name.first",            "description": "<p>Firstname of the User.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name.last",            "description": "<p>Lastname of the User.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.phone",            "description": "<p>Phone of the User.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.password",            "description": "<p>Password of the User.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 401": [          {            "group": "Error 401",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Can't get <code>token</code> check your <code>x-access-token</code>.</p>"          }        ],        "Error 404": [          {            "group": "Error 404",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Can't find User</p>"          }        ],        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't authenticate token.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "/users/:id",    "title": "Get User information",    "name": "GetUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "name",            "description": "<p>User full name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name.first",            "description": "<p>Firstname of the User.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name.last",            "description": "<p>Lastname of the User.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.phone",            "description": "<p>Phone of the User</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.password",            "description": "<p>Password of the User</p>"          }        ]      }    },    "error": {      "fields": {        "Error 404": [          {            "group": "Error 404",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Can't find User with <code>id</code></p>"          }        ],        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't return User</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "/users",    "title": "Get all Users",    "name": "GetUsers",    "group": "Users",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "users",            "description": "<p>List of Users.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "users.name",            "description": "<p>User full name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.name.first",            "description": "<p>Firstname of the User</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.name.last",            "description": "<p>Lastname of the User</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.phone",            "description": "<p>Phone of the User</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.password",            "description": "<p>Password of the User</p>"          }        ]      }    },    "error": {      "fields": {        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't return Users</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "/users/logout",    "title": "Logout User",    "name": "LogoutUser",    "group": "Users",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Bool",            "optional": false,            "field": "auth",            "description": "<p>will return false</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>will return null</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  },  {    "type": "put",    "url": "/users/:id",    "title": "Update user information",    "name": "UpdateUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>User firstname.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>User lastname.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phone",            "description": "<p>User phone number.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Information</p>"          }        ]      }    },    "error": {      "fields": {        "Error 404": [          {            "group": "Error 404",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Can't find User with <code>id</code></p>"          }        ],        "Error 500": [          {            "group": "Error 500",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Contain information why the server can't update User</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "server/controllers/user.controller.js",    "groupTitle": "Users"  }] });
