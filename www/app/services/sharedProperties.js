(function(angular) {
  "use strict";

  angular.module("arcMall").service("sharedProperties", sharedProperties);

  function sharedProperties() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    this.stringValue = "";
    this.selectedTab = "";
    this.objectValue = {};

    function setObject(value) {
      this.objectValue = value;
    }
    function getObject() {
      return this.objectValue;
    }
    return {
      getString: function() {
        return this.stringValue;
      },
      setString: function(value) {
        this.stringValue = value;
      },
      setObject: setObject,
      getObject: getObject
    };
  }
})(angular);
