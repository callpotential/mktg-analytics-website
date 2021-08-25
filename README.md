# mktg-analytics-website
Open Source Repository for CallPotential Marketing Analytics and your website.


JS Plugin Documentation how to Use:

    let div = document.createElement('div');
    $(div).gc_tracking({
          corp_code: 'CFF test',
          location_code: 'HGG test',
          reservation_id: '112222 test',
          gclid: 'gclid.1235.test',
          gcid: 'ga_test',
    });
    document.body.appendChild(div);
   
   
- For use JS plugin need to include one JS file "cp_tracking.js"
- Then need to pass all parameter in this function gc_tracking(); and all parameters are required.
- After calling gc_tracking() funcation it will submit all values at API
- API response will show on console even success or any kind of error.
