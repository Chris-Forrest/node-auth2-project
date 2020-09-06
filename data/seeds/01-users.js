const hashedPassword = "$245ast$7789256at51g7t9r0thekdf587923ljt"

exports.seed = async function(knex) {
  await knex("users").insert([
    {id:1, username:"bendover", password:hashedPassword, department: "sales"},
    {id:2, username:"justaduck", password: hashedPassword, department: "marketing"}
  ])
};
