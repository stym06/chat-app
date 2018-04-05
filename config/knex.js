const knex=require('knex')({
	  client: 'mysql',
	  connection: {
	    host : 'localhost',
	    user : 'root',
	    password : '',
	    database : 'justdoc'
	  }
})

module.exports=knex;