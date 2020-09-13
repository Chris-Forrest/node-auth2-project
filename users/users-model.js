const db = require("../data/config");

async function add(user){
    const [id] = await db("users").insert(user)
    return findById(id)
};

function findById(id){
    return db("users")
    .select("id","username","department")
    .where({ id })
    .first()
};

function find(){
    return db("users").select("id","username","password","department")
};

function findBy(filter){
    return db("users")
        .select("id","username","password","department")
        .where(filter)
};

module.exports = {
    add,
    findById,
    find,
    findBy,
}