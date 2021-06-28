
/**
 * @swagger
 * components:
 *  schemas:
 *      FarmerSchema: 
 *          type: object
 *          required:
 *              - name
 *              - username
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              name:
 *                  type : string
 *              username:
 *                  type : string
 *              email: 
 *                  type : string
 *              password: 
 *                  type : string
 *          example:
 *              id: 60cf230f9d0a832b54414c9a
 *              name: Suresh Tiwari
 *              username: suresht007
 *              email: abc@gmail.com
 *              password: 12345678
 *              
 * 
 */
/**
 * @swagger
 * tags:
 *  name : Farmers
 *  description : Farmers data managing api
 */

/**
 * @swagger
 * /farmers:
 *      get:
 *          summary: Dispalys the list of all farmers
 *          tags: [Farmers]
 *          responses:
 *              200:
 *                  description: Farmers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/FarmerSchema'
 *                    
 *                       
 */

/**
 * @swagger
 * /farmer/{id}:
 *      get:
 *          summary: Get farmer by id
 *          tags : [Farmers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Farmer id        
 *          responses:
 *              200:
 *                  description: Farmers description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/FarmerSchema'
 *              404:
 *                  description: Farmer not found                       
 */


/**
 * @swagger
 * /farmer:
 *      post:
 *          summary: create a new farmer
 *          tags: [Farmers]
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/FarmerSchema'
 *              
 *          responses:
 *              200:
 *                  description: Farmers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/FarmerSchema'
 *                    
 *                       
 */
/**
 * @swagger
 * /farmer/{id}:
 *  put:
 *      summary: Update Farmer details
 *      tags: [Farmers]
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: true
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FarmerSchema'
 *      responses:
 *          200:
 *              description: The farmer details have been updated
 *          404:
 *              description: id not found
 *          500:
 *              some error occured
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      CropSchema: 
 *          type: object
 *          required:
 *              - cropType
 *              - cropName
 *              - quantity
 *              - price
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              cropType:
 *                  type : string
 *              cropName:
 *                  type : string
 *              quantity: 
 *                  type : integer
 *              price: 
 *                  type : integer
 *          example:
 *             
 * 
 */