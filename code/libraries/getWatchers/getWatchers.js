function getWatchers(user_id, func) {
    var watchers = ClearBlade.Query({ collectionName:"users_watching" }).equalTo("watched_id", user_id).columns(['watcher_id']);
    watchers.fetch(function(err, data) {
      users = ClearBlade.Query({ collectionName:"user" }).equalTo("name", 'not-here');
      
      data.DATA.forEach(function(watcher) {
          var userQuery = ClearBlade.Query({ collectionName:"user" }).equalTo("item_id", watcher.watcher_id);
          users = users.or(userQuery);
      })
      users.fetch(function(err, data) {
          func(data.DATA)
      })
    })
}