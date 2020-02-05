/*
page hit object
call count() method to increment counter and return total hits

Count data is stored in a MySQL database named `pagehit` in the `hit` table.
Execute init.sql on first use.
*/

'use strict';

const
  // modules
  httpReferrer = require('./httpreferrer'),

  // MySQL
  mysql = require('mysql2/promise'),
  db = mysql.createPool({
    host:     'mysql',
    user:     'root',
    password: 'mysecret',
    database: 'pagehit',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


module.exports = class {

  // increase URL counter
  async count(req) {

    let
      hash = httpReferrer(req),
      count = null;

    if (!hash) return count;

    // fetch IP address and user agent
    const
      ipRe  = req.ip.match(/(?:\d{1,3}\.){3}\d{1,3}/),
      ip    = ipRe.length ? ipRe[0] : null,
      ua    = req.get('User-Agent') || null;

    try {

      // store page hit
      await db.execute(
        'INSERT INTO `hit` (hash, ip, ua) VALUES (UNHEX(?), INET_ATON(?), ?);',
        [hash, ip, ua]
      );

      // fetch page hit count
      const [res] = await db.query(
        'SELECT COUNT(1) AS `count` FROM `hit` WHERE hash = UNHEX(?);',
        [hash]
      );

      if (res && res[0]) count = res[0].count;

    }
    catch (err) {
      console.log('DB error', err);
    }

    // return counter
    return count;
  }

};
