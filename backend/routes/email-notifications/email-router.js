const express = require('express');
const router = express.Router();
const emailRouter = require('./listen-emails')

router.post('/:method?', async function(req, res) {
    try{
        if(req.body !== undefined){
            if(req.params !== undefined){
                if(req.params['method'] !== undefined){
                    if(req.params['method'] === 'register'){
                        var bodyMAIN = req.body
    
                        await emailRouter(bodyMAIN['username'], 'welcome', bodyMAIN)
                        return res.status(200).json({ status: 'success' }) 
                    } else {
                        if(req.params['method'] === 'changepw'){
                            var bodyMAIN = req.body
    
                            await emailRouter(bodyMAIN['email'], 'changepw', bodyMAIN)
                            return res.status(200).json({ status: 'success' })

                        } else {
                            if(req.params['method'] === 'pwsuccess'){
                                var bodyMAIN = req.body
        
                                await emailRouter(bodyMAIN['email'], 'pwsuccess', bodyMAIN)
                                return res.status(200).json({ status: 'success' })
    
                            } else {
                                if(req.params['method'] === 'pwcode'){
                                    var bodyMAIN = req.body
            
                                    await emailRouter(bodyMAIN['email'], 'pwcode', bodyMAIN)
                                    return res.status(200).json({ status: 'success' })
        
                                } else {
                                    if(req.params['method'] === 'device-new'){
                                        var bodyMAIN = req.body
            
                                        await emailRouter(bodyMAIN['email'], 'device-new', bodyMAIN)
                                        return res.status(200).json({ status: 'success' })
                                    } else {
                                        if(req.params['method'] === 'verify-pin'){
                                            var bodyMAIN = req.body
                
                                            await emailRouter(bodyMAIN['email'], 'verify-pin', bodyMAIN)
                                            return res.status(200).json({ status: 'success' })
                                        } else {
                                            if(req.params['method'] === 'verify-email-change'){
                                                var bodyMAIN = req.body
                    
                                                await emailRouter(bodyMAIN['email'], 'verify-email-change', bodyMAIN)
                                                return res.status(200).json({ status: 'success' })
                                            } else {
                                                if(req.params['method'] === 'remove2fa'){
                                                    var bodyMAIN = req.body
                            
                                                    await emailRouter(bodyMAIN['email'], 'remove2fa', bodyMAIN)
                                                    return res.status(200).json({ status: 'success' })
                        
                                                } else {
                                                    if(req.params['method'] === '2facode'){
                                                        var bodyMAIN = req.body
                                
                                                        await emailRouter(bodyMAIN['email'], '2facode', bodyMAIN)
                                                        return res.status(200).json({ status: 'success' })
                            
                                                    } else {
                                                        if(req.params['method'] === 'removePIN'){
                                                            var bodyMAIN = req.body
                            
                                                            await emailRouter(bodyMAIN['email'], 'removePIN', bodyMAIN)
                                                            return res.status(200).json({ status: 'success' })
                                                        } else {
                                                            if(req.params['method'] === 'PINcode'){
                                                                var bodyMAIN = req.body
                                
                                                                await emailRouter(bodyMAIN['email'], 'PINcode', bodyMAIN)
                                                                return res.status(200).json({ status: 'success' })
                                                            } else {
                                                                return res.status(200).json({ status: 'failed' })
                                                            }
                                                            
                                                        }
                                                        
                                                    }
                                                    

                                                }

                                                
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return res.status(200).json({ status: 'failed' })
                }
            } else {
                return res.status(200).json({ status: 'failed' })
            }
        } else {
            return res.status(200).json({ status: 'failed' })
        }
    } catch(e){
        if(e !== undefined){
            return res.status(200).json({
                status: 'failed'
            })
        }
    }

})



module.exports = router

