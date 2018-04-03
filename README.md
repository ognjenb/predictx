# predictx

- Run `npm install` first.
- Run `npm test` to run unit tests.

Notes:

- In the Description of the problem there is a mistake `if I understood the problem correctly`:

     s1 = "my&friend&Paul has heavy hats! &"
 s2 = "my friend John has many many friends &"
 mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

    `=:ee should be before 2:ff if only the part after : is considered.`

- I would use `TypeScript` to get more compile time checking, avoid catching type mismatch problems in unit test level, define schemas.
- The test coverage could be increased by using generative testing. There are no API or integration tests included.
