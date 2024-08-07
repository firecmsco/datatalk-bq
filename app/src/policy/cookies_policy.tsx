import React, { useEffect, useRef } from "react";

export function CookiesPage() {
    const divRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.innerHTML = html;
        }
    }, [divRef]);

    return (

        <main className="flex-grow container mx-auto px-4 py-8"
              ref={divRef}>
        </main>

    );
}


const html = `

      <div data-custom-class="body">
      <div><strong><span style="font-size: 26px;"><span data-custom-class="title">COOKIE POLICY</span></span></strong></div><div><br></div><div><span ><strong><span style="font-size: 15px;"><span data-custom-class="subtitle">Last updated <bdt class="question">May 25, 2022</bdt></span></span></strong></span></div><div><br></div><div><br></div><div><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">This Cookie Policy explains how <bdt class="question">Dataki</bdt><bdt class="block-component"></bdt> ("<bdt class="block-component"></bdt><strong>Company</strong><bdt class="statement-end-if-in-editor"></bdt>", "<strong>we</strong>", "<strong>us</strong>", and "<strong>our</strong>") uses cookies and similar technologies to recognize you when you visit our websites at<bdt class="forloop-component"></bdt> <bdt class="question"><a href="https://firecms.co" target="_blank" data-custom-class="link">https://firecms.co</a></bdt> or <a href="https://app.dataki.ai" target="_blank" data-custom-class="link">https://app.dataki.ai</a></bdt>,<bdt class="forloop-component"></bdt> ("<strong>Websites</strong>"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.<bdt class="block-component"></bdt></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information. <bdt class="block-component"></bdt></span><bdt class="statement-end-if-in-editor"><span data-custom-class="body_text"></span></bdt></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><strong><span data-custom-class="heading_1">What are cookies?</span></strong></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">Cookies set by the website owner (in this case, <bdt class="question">FireCMS</bdt>) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><strong><span data-custom-class="heading_1">Why do we use cookies?</span></strong></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">We use first<bdt class="block-component"></bdt> and third<bdt class="statement-end-if-in-editor"></bdt> party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. <bdt class="block-component"></bdt>Third parties serve cookies through our Websites for advertising, analytics and other purposes. <bdt class="statement-end-if-in-editor"></bdt>This is described in more detail below.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">The specific types of first<bdt class="block-component"></bdt> and third<bdt class="statement-end-if-in-editor"></bdt> party cookies served through our Websites and the purposes they perform are described below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span ><span ><span id="control"><strong><span data-custom-class="heading_1">How can I control cookies?</span></strong></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit&nbsp;</span></span><span><span data-custom-class="body_text"><a data-custom-class="link" href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a></span></span><span ><span data-custom-class="body_text">&nbsp;or&nbsp;</span></span><span><span data-custom-class="body_text"><a data-custom-class="link" data-fr-linked="true" href="http://www.youronlinechoices.com" target="_blank">http://www.youronlinechoices.com</a></span></span><span ><span data-custom-class="body_text">.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">The specific types of first and third party cookies served through our Websites and the purposes they perform are described in the table below (please note that the specific&nbsp;</span><span data-custom-class="body_text">cookies served may vary depending on the specific Online Properties you visit):</span></span></span><span style="font-size: 15px;"></span></div><div></div><div><div style="line-height: 1.5;"><span data-custom-class="heading_2"><span style="font-size: 15px;"><strong><u><br>Analytics and customization cookies:</u></strong></span></span></div><p style="font-size: 15px; line-height: 1.5;"><span ><span ><span data-custom-class="body_text">These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are, or to help us customize our Websites for you.</span></span></span></p><div><span data-custom-class="body_text"><section data-custom-class="body_text" style="width: 100%; border: 1px solid #e6e6e6; margin: 0 0 10px; border-radius: 3px;"><div style="padding: 8px 13px; border-bottom: 1px solid #e6e6e6;"><table><tbody><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Name:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">_ga_#</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Purpose:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">Used to distinguish individual users by means of designation of a randomly generated number as client identifier, which allows calculation of visits and sessions</span></td></tr><tr style="font-family: Roboto,,serif;  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Provider:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">.firecms.co</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Service:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">Google analytics  <a href="https://policies.google.com/technologies/ads" style="color: #1a98eb !important;" target="_blank">View Service Privacy Policy</a> &nbsp;</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Country:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">United States</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Type:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">http_cookie</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Expires in:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">1 year 11 months 29 days</span></td></tr></tbody></table></div></section><section data-custom-class="body_text" style="width: 100%; border: 1px solid #e6e6e6; margin: 0 0 10px; border-radius: 3px;"><div style="padding: 8px 13px; border-bottom: 1px solid #e6e6e6;"><table><tbody><tr style="font-family: Roboto,,serif;  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Name:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">_ga</span></td></tr><tr style="font-family: Roboto,,serif;  font-size: 12px; line-height: 1.67; margin: 0; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Purpose:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">It records a particular ID used to come up with data about website usage by the user. It is a HTTP cookie that expires after 2 years.</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Provider:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">.firecms.co</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Service:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">Google Analytics  <a href="https://policies.google.com/technologies/ads" style="color: #1a98eb !important;" target="_blank">View Service Privacy Policy</a> &nbsp;</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Country:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">United States</span></td></tr><tr style="font-family: Roboto,  font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Type:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">http_cookie</span></td></tr><tr style="font-family: Roboto,,serif, font-size: 12px; line-height: 1.67; margin: 0 0 8px; vertical-align: top;"><td style="text-align: right; color: #19243c; min-width: 80px;">Expires in:</td><td style="display: inline-block; margin-left: 5px;"><span style="color: #8b93a7; word-break: break-all;">1 year 11 months 29 days</span></td></tr></tbody></table></div></section></span></div></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><strong><span data-custom-class="heading_1">What about other tracking technologies, like web beacons?</span></strong></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">Cookies are not the only way&nbsp;</span><span ><span data-custom-class="body_text">to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Websites<bdt class="block-component"></bdt> or opened an e-mail including them<bdt class="statement-end-if-in-editor"></bdt>. This allows us, for example, to monitor&nbsp;</span><span ><span ><span data-custom-class="body_text">the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.</span><bdt class="block-component"></bdt></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span ><span ><span><strong><span data-custom-class="heading_1">Do you use Flash cookies or Local Shared Objects?</span></strong></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span data-custom-class="body_text">Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention and for other site operations.</span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span data-custom-class="body_text">If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the&nbsp;</span></span><span data-custom-class="body_text"><span><a data-custom-class="link" href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_BLANK"><span style="font-size: 15px;">Website Storage Settings Panel</span></a></span><span >. You can also control Flash Cookies by going to the&nbsp;</span><span><a data-custom-class="link" href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html" target="_BLANK"><span style="font-size: 15px;">Global Storage Settings Panel</span></a></span></span><span ><span data-custom-class="body_text">&nbsp;and&nbsp;</span><span><span data-custom-class="body_text">following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.</span></span></span><span ><span ><span ><span ><span ><bdt class="statement-end-if-in-editor"></bdt><bdt class="block-component"></bdt></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span ><span ><span ><span ><span><strong><span data-custom-class="heading_1">Do you serve targeted advertising?</span></strong></span></span></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span data-custom-class="body_text">Third parties may serve cookies on your computer or mobile device to serve advertising through our Websites. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details or other details that directly identify you unless you choose to provide these.</span></span><span ><span ><span ><span ><span ><bdt class="statement-end-if-in-editor"></bdt></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span><strong><span data-custom-class="heading_1">How often will you update this Cookie Policy?</span></strong></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span data-custom-class="body_text">We may update&nbsp;</span><span ><span data-custom-class="body_text">this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span ><span data-custom-class="body_text">The date at the top of this Cookie Policy indicates when it was last updated.</span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span><strong><span data-custom-class="heading_1">Where can I get further information?</span></strong></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span ><span ><span ><span data-custom-class="body_text">If you have any questions about our use of cookies or other technologies, please email us at <bdt class="question">hello@firecms.co</bdt></span></span></span></span></div><style>
      ul {
        list-style-type: square;
      }
      ul > li > ul {
        list-style-type: circle;
      }
      ul > li > ul > li > ul {
        list-style-type: square;
      }
    </style>
      </div>
`

