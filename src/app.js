import express, { Router } from 'express'
import cors from 'cors'
import { config } from '../config/config.js'
// import pkg from 'express-ipfilter';
import path from 'path';
import fs from 'fs'

// const { IpFilter } = pkg;

const { corsAllow, ipsAllow } = config.whiteList


let whiteList = {}
let clientIp

whiteList['cors'] = {
  origin: [atob(corsAllow)],
}

whiteList['ips'] = function() {
  return ipsAllow
}

clientIp = function(req) {
  return req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
}


const createApp = () => {
  const app = express()
  const router = Router()

  // welcome project
  const publicDirectoryPath = path.join(new URL('.', import.meta.url).pathname, 'public');
  app.use(express.static(publicDirectoryPath));

  // middlewares
  app.use(cors(whiteList.cors))

  // Development | is used to validated IPs Address
  // app.use(function(req, res, next) {
	// 	IpFilter(whiteList.ips, {mode: "allow", log: false, detectIp: clientIp})(req, res, function(err) {
	// 		if (err === undefined) {
	// 			return next();
	// 		}
	// 		res.status(403).json({
  //       message: 'Forbidden',
  //       code: 403,
  //       error: "You are not authorized to access this page.",
  //     });
	// 	});
	// });

  app.get('/', (req, res) => {
    const welcomeFilePath = path.join(publicDirectoryPath, 'welcome.html');
    res.sendFile(welcomeFilePath);
});

  app.use('/api/v1', router)

  router.get('/', (req, res) => {
    res.send('Hello World!')
  })

  return app
}

export { createApp }
