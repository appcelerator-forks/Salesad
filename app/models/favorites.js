exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "m_id": "INTEGER",
		    "u_id": "INTEGER",
		    "b_id": "INTEGER",
		    "position": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "favorites",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			getFavoritesByUid : function(uid){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id='"+ uid+ "' order by position" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var arr = []; 
                var count = 0;
               
                while (res.isValidRow()){
					arr[count] = {
						id: res.fieldByName('id'),
					    b_id: res.fieldByName('b_id'),
						m_id: res.fieldByName('m_id'),
						position: res.fieldByName('position'),
					  	u_id: res.fieldByName('u_id')
					};
					res.next();
					count++;
				} 
                
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			checkFavoriteExist : function(b_id, m_id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE b_id='"+ b_id+ "' AND m_id='"+m_id+"'" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                
                if(res.fieldByName('id')){
                	var id = res.fieldByName('id');
                	res.close();
                	db.close();
                	return id;
                }else{
                	res.close();
                	db.close();
                	return false;
                }
                res.close();
                db.close();
			},
			deleteFavorite : function(id){
				var collection = this;
		        var sql = "DELETE FROM " + collection.config.adapter.collection_name+" where id="+id;
		        
		        var db2 = Ti.Database.open(collection.config.adapter.db_name);
		        db.file.setRemoteBackup(false);
		        db2.execute(sql);
		        db2.close();
		        collection.trigger('sync');
			},
			resetFavorites : function(){
				var collection = this;
		        var sql = "DELETE FROM " + collection.config.adapter.collection_name;
		        db = Ti.Database.open(collection.config.adapter.db_name);
		        db.file.setRemoteBackup(false);
		        db.execute(sql);
		        db.close();
		        collection.trigger('sync');
			},
			updatePosition : function(id, position){
				var collection = this;
				var sql = "UPDATE " + collection.config.adapter.collection_name + " SET position='"+position+"' WHERE id='" +id+"'";
		        db = Ti.Database.open(collection.config.adapter.db_name);
		        db.file.setRemoteBackup(false);
		        db.execute(sql);
		        db.close();
			}
		});

		return Collection;
	}
};