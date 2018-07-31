'use strict'

const debug = require('debug')('42student:check')
const request = require('../utils/request')

module.exports = async (ctx) => {
  const {login} = ctx.params
  debug(`Try to find an user with login: ${login}`)

  // Try to find user
  const users = await request(`/users?filter[login]=${login}`)
  if (!users || users.length === 0) return debug(`No users found with login ${login}`) // 404 not found

  const {id} = users[0]
  debug(`User found with login ${login} (ID: ${id})`)

  // Fetch user
  const user = await request(`/users/${id}`)
  const poolCursus = user.cursus_users.find(userCursus => userCursus.cursus.slug.indexOf('piscine-c') > -1)
  const isStudent = user.cursus_users.some(userCursus => userCursus.cursus.slug === '42')

  debug(`User profile found (Pool: ${user.pool_month} ${user.pool_year} - lvl ${poolCursus.level}), student: ${isStudent}`)
  ctx.body = {
    pool: {
      month: user.pool_month,
      year: user.pool_year,
      start: poolCursus.begin_at,
      end: poolCursus.end_at
    },
    is_student: isStudent
  }
}
