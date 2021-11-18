# mktg-analytics-website
Open Source Repository for CallPotential Marketing Analytics and your website.

Make sure you check out the Wiki for additional information and a walk thru video.


JS Plugin Documentation 

How to Use:

This function should be called after the successful transmission of a lead into your Property Management System

    let div = document.createElement('div');
    $(div).gc_tracking({
          corp_code: 'CCTST',
          location_code: 'TST',
          reservation_id: '112222',
          gclid: 'EAIaIQobChMDnavM8gIVociUCR0RGAT-EAAYASAAEgIrXvD_BwE',
          gcid: '18208190227674681406',
          url: 'https://www.abc.com/?gclid=EAIaIQobChMDnavM8gIVociUCR0RGAT-EAAYASAAEgIrXvD_BwE',
    });
    document.body.appendChild(div);
    
For transmission of rentals without an initial lead, use the following code:
(notice the replacement of reservation_id with ledger_id)

    let div = document.createElement('div');
    $(div).gc_tracking({
          corp_code: 'CCTST',
          location_code: 'TST',
          ledger_id: '112222',
          gclid: 'EAIaIQobChMDnavM8gIVociUCR0RGAT-EAAYASAAEgIrXvD_BwE',
          gcid: '18208190227674681406',
          url: 'https://www.abc.com/?gclid=EAIaIQobChMDnavM8gIVociUCR0RGAT-EAAYASAAEgIrXvD_BwE',
    });
    document.body.appendChild(div);
   
   
- For use JS plugin need to include one JS file "cp_tracking.js"
- Then need to pass all parameter in this function gc_tracking(); and all parameters are required.
- After calling gc_tracking() funcation it will submit all values at API
- API response will show on console even success or any kind of error.


How to find gcid from Cookie?
- You can find under cookie with key name _ga 
- Attached one image 'cookie.png' about cookie for a reference when someone visit site by google Ads.
