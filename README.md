![image](https://roam-smart.com/wp-content/uploads/unified-roaming-platform.png)

#  Carcasse Node Express Mongo Project



You can call the function logger(req, level, full_message, message) anywhere in the project to send the log to graylog .
Paramaters :
- req : the whole request
- level : number from 0 to 6
- full_message : the full error message
- message : the minified error message

## http status codes
| STATUS | MESSAGE                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------|
| `200`  | success                                                                                                |
| `201`  | success and new entry created                                                                          |
| `204`  | success but response is empty                                                                          |
| `209`  | not updated, may because of new values equal to old values                                                   |
| `210`  | params sent are not valid comparing to data saved in DB but the server handled it |
| `401`  | token errors (missing, invalid, expired ..) you should try relogin before contacting backend developer |
| `403`  | you dont have permission, check the role                                                               |
| `422`  | request params or body are malformed, reload this doc for any changes of attributes names              |
| `423`  | wrong password              |
| `424`  | entry duplication               |
| `461`  | a unique constraint error               |
| `445`  |You can't accept a replacement without selecting a replacer               |
| `462`  | not allowed, check your allowed features               |
| `522`  | database fail, you should contact backend developer               |
| `523`  | operation error, redoing the action with different parameters may succeed (it may be temporary error)               |
| `524`  | operation error but it can be overrided, headers.force=true required to override               |


| HTTP METHODS | COLOR                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------|
| POST  | &#x1F4D8;|
| GET  | &#x1F4D7;|
| PUT  | &#x1F4D9;|
| DELETE  | &#x1F534;|

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# &#x1F4D8; Register

``` POST
http://192.168.2.15:5002/unified/exampleMicroservice/auth/register
```

Create User


### body
```
{
  "user_name":"test",
"passwordHash":"password test 1",
"first_name": "test first name",
"last_name": "test last name",
"email": "test@test.com",
}

```

### Response

```
user registred
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# &#x1F4D8; Login

``` POST
http://192.168.2.15:5002/unified/exampleMicroservice/auth/login
```

Create User


### body
```
{
"password":"password test 1",
"email": "test@test.com",
}

```

### Response

```
{
  token: "hbqsjhdvqshgdvuyqsd6duygh778jhhj6"
}
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------


# &#x1F4D8; Add Country

``` POST
http://192.168.2.15:5002/unified/exampleMicroservice/country
```

Add countries
### body
```
{
  name: "Tunisia",
  alpha2: "TN",
  alpha3: "TUN",
  cc: "216"
}

```

### Response

```
{
savedCountry
}
```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------


# &#x1F534; Delete Country

``` DELETE
http://192.168.2.15:5002/unified/exampleMicroservice/country/delete
```

Delete countries


### Response

```
{
savedCountry
}
```
