
## Game of Thrones API
This is a simple web-application, written in Typescript, using NodeJS, Express framework, Mongoose and MongoDB. 

### Exposed web-services

    /list
Returns a list of all batles in the database

    /count
Returns the total number of battles in the database

    /stats

Returns statistics, such as most aggressive kings, victory & loss statistics, troop number statistics and battle types.


    /search
Returns records matching search query. Supported query keys:

 - King - will search for matches in 'attacker_king' or 'defender_king' collumns
 - Type - will search for matches in 'battle_type' collumn
 - And others (parameter name must match the schema property name)   

### Development

```bash
npm run dev
```

### Running tests

```bash
npm test
```
