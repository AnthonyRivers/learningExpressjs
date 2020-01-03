import { addNewContact, 
	 getContacts, 
	 updateContact,
	 deleteContact } 
from '../controllers/crmController';

const routes = (app) =>{
	app.route('/contact')
       .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
     }, getContacts)
     	.post(addNewContact); // post endpoint
     
   // End points to update a specific contact, and delete a specific contact
    app.route('/contact/:contactID')
       .put(updateContact)
       .delete(deleteContact);
};

export default routes;
