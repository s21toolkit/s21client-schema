# s21client-schema 📦👍

Схема GQL API платформы edu.21-school.ru для [s21client](https://github.com/s21toolkit/s21client).
Обновляется автоматически при изменении схемы. Версия пакета соответствует версии продукта.

```sh
npm install @s21toolkit/client-schema
```

## Использование

```ts
import { Client, UserAuthAdapter } from "@s21toolkit/client"
import { Schema } from "@s21toolkit/client-schema"

const client = new Client(Schema, new UserAuthAdapter("username", "p4ssw0rd"))

const user = await client.api.getCurrentUser()
```

## Зачем отдельный пакет

Для удобства обновления и версионирования. Пакет со схемой обновляется только в случае изменения схемы, за остальное отвечает пакет клиента.

## Использованте без клиента

Если нужны только запросы и своя реализация клиента:

```ts
import { GraphQLClient } from "graphql-request"
import { S21_GQL_API_URL, UserAuthProvider, getAuthHeaders } from "@s21toolkit/auth"
import { getSdk } from "@s21toolkit/client-schema"

const auth = new UserAuthProvider("username", "p4sswo0rd")

const client = new GraphQLClient(S21_GQL_API_URL, {
   requestMiddleware: async (request) => {
      const authHeaders = await getAuthHeaders(auth)
      return {    
         ...request,
         headers: {
            ...request.headers,
            ...authHeaders,
         }   
      }   
   }
})

const sdk = getSdk(client)

const user = await sdk.getCurrentUser()
```
