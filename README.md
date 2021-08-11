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
