const configuration = require('../../../configuration');

async function returnHTML(data){
    var link = data['link']
    var dataURL = configuration[0]['emailDocURL']
    


    var output = `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="robots" content="noindex, nofollow" />
	<meta http-equiv="Content-Style-Type" content="text/css;charset=UTF-8" />
</head>
<title>Password Reset - ACCOUNT</title>

<body style="background-color:#f5f5f5;color:#3B4855;font-family:Arial,Roboto,SegoeUI,Helvetica,sans-serif;font-size:14px;line-height:20px;" vlink="#35729f" alink="#35729f" link="#35729f" text="#3B4855" bgcolor="#f5f5f5" inx="inx">
	<a name="top" id="top"></a>
	<table style="text-align:center;" bgcolor="#f5f5f5" align="center" cellspacing="0" cellpadding="0" border="0" width="100%">
		<tbody>
			<tr>
				<td style="vertical-align:top;" valign="top" align="left">
					<div align="center">
						<table style="text-align:center;" bgcolor="#f5f5f5" align="center" cellspacing="0" cellpadding="0" border="0" width="720">
							<tbody>
								<tr>
									<td style="vertical-align:top;" valign="top" align="left" width="720">
										<table width="720" class="d" cellspacing="0" cellpadding="0" border="0">
											<tbody>
												<tr>
													<td style="vertical-align:top;line-height:0px;" width="720" valign="top" align="left"></td>
												</tr>
											</tbody>
										</table>
										<table width="720" class="w50" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
											<tbody>
												<tr>
													<td height="22" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
													<td height="22" width="580" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
													<td height="22" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
												</tr>
											<tr>
												<td height="22" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
												</td>
												<td height="22" width="580" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
												</td>
												<td height="22" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
												</td>
											</tr>
												<tr>
													<!-- <td width="70" bgcolor="#FFFFFF" style="vertical-align:top;"> -->
													<!-- </td> -->
													<td width="580" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;"><a href="https://www.ACCOUNT.live" style="margin-left: 50px;" target="_blank"><img src="${dataURL}/images/logo-mk12.png" alt="" name="" file="" width="200" height="65" class="w100" border="0" hspace="0" vspace="0" align="top" /></a></td>
													<td width="70" bgcolor="#FFFFFF" style="vertical-align:top;">
													</td>
												</tr>
												<tr>
													<td height="20" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
													<td height="20" width="580" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
													<td height="20" width="70" valign="top" align="left" bgcolor="#FFFFFF" style="vertical-align:top;line-height:0px;">
													</td>
												</tr>
											</tbody>
										</table>
										<table width="720" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff">
											<tbody>
												<tr>
													<td width="70" bgcolor="#ffffff" style="vertical-align:top;">
													</td>
													<td width="580" valign="top" align="left" bgcolor="#ffffff" style="vertical-align:top;">
														<table width="580" cellspacing="0" cellpadding="0" border="0">
															<tbody>
																<tr>
																	<td style="vertical-align:top;" width="580" height="50">
																	</td>
																</tr>
																<tr>
																	<td style="vertical-align:top;" width="580" valign="top" align="left">
																		
																		<table style="text-align:left;" width="580" align="left" cellspacing="0" cellpadding="0" border="0">
																			<tbody>
																				<tr>
																					<td style="vertical-align:top;" width="580" valign="top" align="left">
																						<span style="font-family:Roboto,SegoeUI,Helvetica,Arial,sans-serif;line-height:20px;font-size:14px;color:#3B3855; font-weight: bolder">
																							Password Reset<br />
			<br />
			
           
           

            We sent you a link so you are able to reset your password. Please keep in mind, you are able to reset your password only 5 minutes after that, you will need to restart your invoice. 

<br />

<span style="font-family:Roboto,SegoeUI,Helvetica,Arial,sans-serif;line-height:20px;font-size:14px;color:#3B3855; font-weight: bolder; text-align: center; display: block; margin-top: 85px;">
																						
    Token will expire in 5 minutes: <br />
    ${link} <br />
    
    <br />
</span>
<span style="font-family:Roboto,SegoeUI,Helvetica,Arial,sans-serif;line-height:20px;font-size:14px;color:#3B3855; font-weight: bolder; text-align: center; display: block; margin-top: 75px;">
																						
    <a href="${link}" style="display: inline-block; background: #2e58ff; color: white; font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: normal; line-height: 30px; margin: 0; text-decoration: none; text-transform: none; padding: 6px 25px; width: 150px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank">Reset Password</a>
    
    <br />
</span>

			<b></b><br />
			 <b></b><br />
			<br />
			
			We do not respond directly to notification emails, please dont try to respond to this message. Always make sure email is sent from accounts@ACCOUNT.live<br />
			
			
			
																							<br />
																						</span>
                                                                                       
																						
																						<br style="font-size:20px;line-height:20px;">

																						<table class="button" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="display: grid; justify-content: center;">
																							<tbody>
																								<tr>
                                                                                                    
                                                                                                  </tr>
																							</tbody>
																						</table>
																						<table>
																							<tr>
																								<td style="vertical-align:top;" width="580" valign="top" align="left">
																									<span style="font-family: Roboto, SegoeUI, Helvetica, Arial, sans-serif; line-height: 20px; font-size: 14px; color: #3B3855; font-weight: bolder">
																										<br />
																										<b>Please note:</b> Please node: ACCOUNT will never ask for your login information.
																									</span>
																								</td>
																							</tr>
																						</table>
																					</td>
                                                                                    
																				</tr>
																			</tbody>
																		</table>
																		<!--[if mso | ie]>
																			  </td>
																		   </tr>
																		</table>
																		<![endif]-->
																	</td>
																</tr>
																<tr>
																	<td style="vertical-align:top;" width="580" height="60">
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
													<td width="70" bgcolor="#ffffff" style="vertical-align:top;">
													</td>
												</tr>
											</tbody>
										</table>
										<table cellspacing="0" cellpadding="0" border="0" width="720">
											<tbody>
												<tr>
													<td style="vertical-align:top;line-height:0px;" valign="top" align="left" height="3" width="720"></td>
												</tr>
											</tbody>
										</table>

										<table cellspacing="0" cellpadding="0" border="0" width="720">
	<tbody>
		<tr>
			<td style="vertical-align:top;line-height:0px;" valign="top" align="left" height="3" width="720"></td>
		</tr>
	</tbody>
</table>
<table width="720" bgcolor="#2c4bff"align="center"  cellspacing="0" cellpadding="0" border="0">
	<tbody>
		<tr>
			<td style="vertical-align:top;line-height:0px;" height="40" width="70" bgcolor="#2c4bff" valign="top" align="center">
			</td>
			<td style="vertical-align:top;line-height:0px;" height="40" width="580" bgcolor="#2c4bff" valign="top" align="center">
			</td>
			<td style="vertical-align:top;line-height:0px;" height="40" width="70" bgcolor="#2c4bff" valign="top" align="center">
			</td>
		</tr>
		<tr>
			<td style="vertical-align:top; justify-content: center; display: grid;" width="580" bgcolor="#2c4bff" valign="top" align="center">
			
			
				<table style="text-align:center; margin-left: 150px;" width="439" bgcolor="#2c4bff" align="center" cellspacing="0" cellpadding="0" border="0">
					<tbody>
						<tr>
                            <td style="vertical-align:top;" width="439" bgcolor="#2c4bff" valign="top" align="center">
                                <span style="color: #FFFFFF; font-family: Roboto, SegoeUI, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; font-weight: bolder;">
                                    We do respond to emails and you can reach us out in our discord group if you have a question.&nbsp;</span><br/>


                                <br style="font-size:24px;line-height:24px;">
                                    <span style="color: #ffffff; font-family: Roboto, SegoeUI, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none; font-weight: bolder;">&gt;&nbsp;Email: support@ACCOUNT.live</span>
                                </br>
                                <br style="font-size:24px;line-height:4px;">
                                    <span style="color: #ffffff; font-family: Roboto, SegoeUI, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none; font-weight: bolder;">&gt;&nbsp;Web: https://www.ACCOUNT.live</span>
                                </br>
                                <br style="font-size:24px;line-height:4px;">
                                    <span style="color: #ffffff; font-family: Roboto, SegoeUI, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none; font-weight: bolder;">&gt;&nbsp;Discord: discord@ACCOUNT.live</span>
                                </br>
                            </td>

						
						</tr>
					</tbody>
				</table>
				
			</td>
			<td style="vertical-align:top;" width="70" bgcolor="#2c4bff">
			</td>
		</tr>
		<tr>
			<td style="vertical-align:top;line-height:0px;" height="40" width="70" bgcolor="#2c4bff" valign="top" align="left">
			</td>
			<td style="vertical-align:top;line-height:0px;" height="40" width="580" bgcolor="#2c4bff" valign="top" align="left">
			</td>
			<td style="vertical-align:top;line-height:0px;" height="40" width="70" bgcolor="#2c4bff" valign="top" align="left">
			</td>
		</tr>
		<tr>
			<td style="vertical-align:top;line-height:0px;" height="3" width="70" bgcolor="#f5f5f5" valign="top" align="left"></td>
			<td style="vertical-align:top;line-height:0px;" height="3" width="580" bgcolor="#f5f5f5" valign="top" align="left"></td>
			<td style="vertical-align:top;line-height:0px;" height="3" width="70" bgcolor="#f5f5f5" valign="top" align="left"></td>
		</tr>
	</tbody>
</table>


<br />


									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</td>
			</tr>
		</tbody>
	</table>

</body>
</html>
    `;


    return output
}

module.exports = returnHTML