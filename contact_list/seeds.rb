require 'pry'
require_relative './db/connection'
require_relative './lib/category'
require_relative './lib/contact'

Category.delete_all
Contact.delete_all

mariachis = Category.create(name: "mariachis")
diablos = Category.create(name: "diablos")
amigos = Category.create(name: "amigos")

Contact.create(name: "Sean", category_id: amigos.id)
Contact.create(name: "Jeff", category_id: mariachis.id)
Contact.create(name: "Neel", category_id: diablos.id)
