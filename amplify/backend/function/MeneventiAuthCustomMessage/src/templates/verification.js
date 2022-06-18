const verificationTemplate = (event) => `
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="date=no">
<meta name="format-detection" content="telephone=no">
<meta name="x-apple-disable-message-reformatting">

	<style type="text/css">
    .ReadMsgBody { width: 100%; background-color: #ffffff;}
    .ExternalClass {width: 100%; background-color: #ffffff;}
    .ExternalClass, .ExternalClass p, .ExternalClass span,
    .ExternalClass font, .ExternalClass td, .ExternalClass tbody {line-height:100%;}
    #outlook a { padding:0;}
    html,body {margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important;}
    * {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}
    table,td {mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}
    table {border-spacing: 0 !important;}
    table table table {table-layout: auto;}
    a,span a{text-decoration: none !important;}
    .yshortcuts, .yshortcuts a, .yshortcuts a:link,.yshortcuts a:visited,
    .yshortcuts a:hover, .yshortcuts a span { text-decoration: none !important; border-bottom: none !important;}

    /*mailChimp class*/
    ul{padding-left:10px; margin:0;}


    /* Start Old CSS */
    @media only screen and (max-width: 640px){
      .full-width{width:100%!important; max-width:100%!important; min-width:100%!important; clear: both;}
    }
    @media only screen and (max-width: 479px){
      .full-width,.full-width-479{width:100%!important; max-width:100%!important; min-width:124px!important; clear: both;}
      .full-width-center {width: 100%!important; max-width:100%!important; min-width:124px!important; text-align: center!important; clear: both; margin:0 auto; float:none;}
      .full-block-479{display:block !important; clear: both; padding-top:10px; padding-bottom:10px; }
      /* halper */
      img{max-width:280px !important;}
      .resize-font, .resize-font *{font-size: 37px !important; line-height: 48px !important;}
    }
    /* End Old CSS */

    @media only screen and (max-width:640px){
      .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
      .full-width.fix-800{min-width:auto!important;}
    }

    @media only screen and (max-width:480px){
      .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
      .full-width.fix-800{min-width:auto!important;}
    }

    td ul{list-style: initial; margin:0; padding-left:20px;}

    body{background-color:#ffffff; margin: 0 auto !important; height:auto!important;}
    tr.tpl-repeatblock , tr.tpl-repeatblock > td{ display:block !important;}
    .tpl-repeatblock {padding: 0px !important;border: 1px dotted rgba(0,0,0,0.2); }


    *[x-apple-data-detectors], .unstyle-auto-detected-links *,
    .aBn{border-bottom: 0 !important; cursor: default !important;color: inherit !important; text-decoration: none !important;font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;line-height: inherit !important;}
    .im {color: inherit !important;}
    .a6S {display: none !important; opacity: 0.01 !important;}
    img.g-img + div {display: none !important;}
    img {height: auto !important; line-height: 100%; outline: none; text-decoration: none !important; -ms-interpolation-mode:bicubic;}
    a img{ border: 0 !important;}
    a:active,a:link,a:visited{color:inherit; text-decoration: none !important; }
    #outlook a, span a ,a {color:inherit; text-decoration: none !important;}
    u + #body a {color: inherit; text-decoration: none !important; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit;}
    table td {border-collapse:unset; -webkit-hyphens: none; -moz-hyphens: none; hyphens: none;}
    table p{margin:0; padding:0;}
	</style>

</head>
<body style="font-size:12px; width:100%; height:100%; background-color:#f1f1f1;">
<table id="mainStructure" class="full-width" width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 800px; outline: #efefef solid 1px; box-shadow: #e0e0e0 0px 0px 30px 5px; margin: 0px auto;">
  <tbody>
    <!-- START HEADER-->
    <tr>
      <td align="center" valign="top">
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation">
          <tbody><tr>
            <td valign="top">
              <table width="560" border="0" cellspacing="0" cellpadding="0" align="center" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                <tbody><tr>
                  <td valign="top" height="25" style="height: 25px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                </tr>
                <tr>
                  <td valign="top" style="text-align: center;">
                    <a href="https://meneventi.com" style="text-decoration: none !important;font-size: inherit;border-style: none;display: inline-block;" border="0">
                      <img src="https://meneventi-site.s3.amazonaws.com/meneventi-white-bg.png" width="400" style="display: block !important; max-width: 100%;" alt="Meneventi" border="0">
                    </a>
                  </td>
                </tr>
                <tr><td valign="top" height="10" style="height: 10px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td></tr>
                <tr><td><hr style="border:1px solid #EEEEEE; margin-top: 20px;" /></td></tr>
                <tr><td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td></tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!--END HEADER-->
    <!-- START ORDER-TABLE -->
    <tr>
      <td valign="top" align="center" style="background-color: #ffffff; " bgcolor="#ffffff">
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #ffffff; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation">
          <tbody><tr>
            <td valign="top" align="center">
              <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                <!-- start title -->
                <tbody><tr>
                  <td valign="top">
                    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                      <!-- start space -->
                      <tbody><tr>
                        <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                      </tr><!-- end space -->
                      <tr>
                        <td align="center">
                          <span style="color: #333333; text-decoration: none; font-style: normal; line-height: 28px; font-size: 24px; font-weight: 700; font-family: esqmarket-medium,-apple-system,BlinkMacSystemFont,Helvetica,sans-serif;">
                            Here's your unique verification code
                          </span>
                        </td>
                      </tr><!-- start space -->
                      <tr>
                        <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                      </tr><!-- end space -->
                      <tr>
                        <td align="center">
                          <span style="color: #6d6d6d; text-decoration: none; font-style: normal; font-size: 18px; font-family: esqmarket-medium,-apple-system,BlinkMacSystemFont,Helvetica,sans-serif;">
                            Enter this code online so we can verify your account.
                          </span>
                        </td>
                      </tr><!-- start space -->
                      <tr>
                        <td valign="top" height="30" style="height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                      </tr><!-- end space -->
                    </tbody></table>
                  </td>
                </tr><!-- end title -->
                <tr>
                  <td valign="top" align="center">


                    <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="margin: 0px auto;width: 560px;min-width: 280px;max-width: 90%;border: 1px solid #DDD;" role="presentation">
                      <tbody>
                        <tr>
                          <td align="center" height="50">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center">
                            <span style="color: #333333; text-decoration: none; font-style: normal; line-height: 28px; font-size: 50px; font-weight: 700; font-family: esqmarket-medium,-apple-system,BlinkMacSystemFont,Helvetica,sans-serif;">
                              {####}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" height="50">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>


                  </td>
                </tr>
                <tr>
                  <td valign="top" align="center">
                    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                      <tbody>


                      <tr>
                        <td valign="top" height="30" style="height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                      </tr><!-- end space -->
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr><!-- END ORDER-TABLE -->

  </tbody>
</table>

</body></html>
`;

module.exports = {
 verificationTemplate
}