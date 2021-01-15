const dev = process.env.NODE_ENV !== 'production'
const devKey = 'a01xRORywkAdhDTRvfDDz/WGDl05olyDK+g3Y+FrGLkZZEPgQ4osZPOB'
const devSecret = 'ZEw+ps02kzaqKV/O1W5zQZSgQYVPfXt/IUWOdMWwyhEVQ7Wxg52oQ87df+9H6H+24lwQ0TKt2N0hAvQ7kELyjA=='
const prodKey = 'w8XQCFPhFkduAw6rNjma+gU6reqpXL9TXMSDSEWwi+zEUMJtyas23D6J' // API Key
const prodSecret = '3UMr+ytRHnvxEWmOtqRPOlJEVWQZzKGCZ3C3+2jYkQuEAJLrqGIcog+j4wYGbXw1Agc85a5RlQ/xP6FwKszmYA==' // API Private Key
export const key = dev ? devKey : prodKey
export const secret = dev ? devSecret : prodSecret
export const port = 3000
export const baseUrl = 'https://api.kraken.com'
