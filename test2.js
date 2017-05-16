const api_link = 'https://api.wheniwork.com';

const api_key = '86c6930065b9467f4e95c5d28522804ea12ef859';
const username = 'sinriver413@hotmail.com';
const password = 'hunter2hunter2';
const login_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjEsImxvZ2luIjoiOTI4MTQyNiIsInBpZCI6IjkyODE0MjYifQ.Kp_cecg9AAFH7KCMYdgBaSko1TxMQMVgWWXrcK-NewBgAjQ_yejhpRg8LxOG2Bc2CJhhg-9Q013akmT-52xjWBe03q5B3u10B3wPbPrRyPVrrTOfSy9VK8mmTBzgkPD-ua6nLwEm_wC6LoVW1k53hd1ZM7YFVjnpfWD5NtN632Hrq3bKTFyR8rsXVjzShyAkBqUJzYN9O8q5WguByYFHgihffMAqCuG96n7izGwBfh1BcC-jXPQIWAc77ZemZWss3WigAlvy8jBbNuNHpOOA-wrFYiUXj54fA2Pkjmkubcn1LRoKYxd7Gw6z-3aEEa3-nXxCK6ynFypzHbnnGk_q7w';

const fetch = require('node-fetch');

// fetch(`${api_link}/2/shifts/5`, {
//     headers: {
//         'W-Key': api_key
//     }
// })
// .then(response => response.json())
// .then(data => console.log);

/*
fetch(`${api_link}/2/login`, {
    body: {
        "username": "sinriver413@hotmail.com",
        "password": "hunter2hunter2"
    },
    headers: {
        "W-Key": api_key
    }
})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
});
*/

// curl https://api.wheniwork.com/2/login \
//   --data '{"username":"sinriver413@hotmail.com", "password": "hunter2hunter2"}' \
//   -H "W-Key: 86c6930065b9467f4e95c5d28522804ea12ef859"

/*
fetch("https://api.wheniwork.com/2/login", {
  body: "{\"username\":\"sinriver413@hotmail.com\", \"password\": \"hunter2hunter2\"}",
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
    "W-Key": "86c6930065b9467f4e95c5d28522804ea12ef859"
  }
}).then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
});
*/

// RESULT 
/*
{
    "login":{
        "id":9281426,
        "name":"",
        "first_name":"Sebastian",
        "last_name":"Wong",
        "email":"sinriver413@hotmail.com",
        "phone_number":"",
        "created_at":"Mon, 15 May 2017 23:41:04 -0500",
        "updated_at":"Mon, 15 May 2017 23:41:04 -0500",
        "avatar":{
            "url":"https:\/\/avatars.wheniwork.com\/c4733c6eaf5ec0a5d8807430ea265ce04e214269\/%s","size":"%s"
        },
        "token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjEsImxvZ2luIjoiOTI4MTQyNiIsInBpZCI6IjkyODE0MjYifQ.Kp_cecg9AAFH7KCMYdgBaSko1TxMQMVgWWXrcK-NewBgAjQ_yejhpRg8LxOG2Bc2CJhhg-9Q013akmT-52xjWBe03q5B3u10B3wPbPrRyPVrrTOfSy9VK8mmTBzgkPD-ua6nLwEm_wC6LoVW1k53hd1ZM7YFVjnpfWD5NtN632Hrq3bKTFyR8rsXVjzShyAkBqUJzYN9O8q5WguByYFHgihffMAqCuG96n7izGwBfh1BcC-jXPQIWAc77ZemZWss3WigAlvy8jBbNuNHpOOA-wrFYiUXj54fA2Pkjmkubcn1LRoKYxd7Gw6z-3aEEa3-nXxCK6ynFypzHbnnGk_q7w"
    },
    "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2N0IjoxODE3ODM5LCJ1c2VyIjoxODg3NTI4NCwiYXBwIjoyMDA5LCJsb2dpbiI6OTI4MTQyNiwiaWF0IjoxNDk0OTA0ODk1LCJqdGkiOiJhYmJkZDA2NS05MTAxLTUyZDItYWU2MC02NmE2MGNjNjJkNGEifQ.hXiIOYcWOR7rbTKmtANRbt1eeHzca-taGl716lpthJw",
    "user":{
        "id":18875284,
        "account_id":1817839,
        "login_id":9281426,
        "timezone_id":0,
        "country_id":233,
        "migration_id":0,
        "created_by":0,
        "role":3,
        "is_payroll":false,
        "is_trusted":0,
        "type":1,
        "email":"sinriver413@hotmail.com",
        "first_name":"Sebastian",
        "last_name":"Wong",
        "phone_number":"",
        "employee_code":"",
        "avatar":{
            "url":"https:\/\/avatars.wheniwork.com\/b6d4acff7edc85cc482e6c7030dc596e2b2f5805\/%s","size":"%s"},
            "password":false,
            "activated":true,
            "is_hidden":false,
            "uuid":"43438d08eb19387830e098bace0d45bf1274d983",
            "notes":"",
            "affiliate":0,"is_private":true,"infotips":"","hours_preferred":0,"hours_max":40,"hourly_rate":0,"alert_settings":{"timeoff":{"sms":false,"email":true},"swaps":{"sms":false,"email":true},"schedule":{"sms":false,"email":true},"reminders":{"sms":false,"email":true},"availability":{"sms":false,"email":true},"new_employee":{"sms":false,"email":true},"attendance":{"sms":false,"email":false},"workchat":{"alerts":true,"badge_icon":true,"in_app":true}},"reminder_time":2,"sleep_start":"23:00:00","sleep_end":"05:00:00","my_positions":[],"is_onboarded":false,"last_login":"Mon, 15 May 2017 23:45:26 -0500","dismissed_at":"","notified_at":"Wed, 30 Nov -001 00:00:00 -0600","invited_at":"","created_at":"Mon, 15 May 2017 23:41:33 -0500","updated_at":"Mon, 15 May 2017 23:43:31 -0500","deleted_at":"","is_deleted":false,"is_active":true,"timezone_name":"America\/New_York","positions":[],"position_quality":[],"position_rates":[],"locations":[2697648],"country_code":"US","is_internal_login":false,"unacknowledged":[],"first_mobile_login":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2N0IjoxODE3ODM5LCJ1c2VyIjoxODg3NTI4NCwiYXBwIjoyMDA5LCJsb2dpbiI6OTI4MTQyNiwiaWF0IjoxNDk0OTA0ODk1LCJqdGkiOiJhYmJkZDA2NS05MTAxLTUyZDItYWU2MC02NmE2MGNjNjJkNGEifQ.hXiIOYcWOR7rbTKmtANRbt1eeHzca-taGl716lpthJw"},"account":{"id":1817839,"master_id":0,"country_id":233,"agent_id":103,"type":1,"logo":"","company":"SebWong Inc.","subdomain":"sebwonginc","enabled":true,"custom_domain":"","plan_id":-6,"plan_expires":"Wed, 30 Nov -001 00:00:00 -0600","plan_units":0,"plan_type":1,"features":["scheduling","int-basic","acknowledgement","annotations","mobile-alerts","workchat","open-shifts","position-view","sms-alerts","swaps-drops","schedule-builder","schedule-templates","live-chat","long-term-scheduling-21"],"wb_expires":false,"plan_custom":0,"plan_texting":false,"text_credits":25,"timezone_id":9,"place_id":"1102068","place_confirmed":true,"billing_type":0,"tax_exemption":"","mbsy_short_code":"","referral_code":"","ref_plan_id":-6,"ref_employees":5,"notifications":[{"key":"annual_upgrade","show":false},{"key":"legacy_upgrade","show":false},{"key":"trial_upgrade","show":false}],"settings":{"schedule":{"enabled":true,"split_shifts":0,"preferred_hours":true,"shift_acknowledgement":true,"start_of_week":0,"24hour":false,"sort_employees":0,"is_visible":true,"positions_only":false,"open_scheduling":false,"currency":"$"},"timeoff":{"enabled":true,"manager_approval":true,"supervisor_autoapprove":true,"days_notice":0,"is_public":true,"max_hours_per_day":8},"availability":{"enabled":true,"is_public":true},"swaps":{"enabled":true,"manager_approval":true},"conversations":{"enabled":true},"permissions":{"text_credits":0},"social":{"enabled":true},"privacy":{"enabled":false},"workchat":{"enabled":true,"last_enabled_date":"Wed, 11 May 2016 00:00:00 -0500","toggled":null},"clockin":{"enabled":true,"mobile":{"enabled":true,"strict":false,"radius":100},"work":{"enabled":true},"window":15},"payroll":{"enabled":true,"timesheets":true,"start_date":null,"type":0,"hours_max":40,"hours_max_daily":24,"hours_dot_daily":24,"ot_multiplier":1.5,"dbl_multiplier":2,"work_day_start":"00:00","adp_enabled":false,"adp_viewable":false,"is_onboarded":false},"integrations":{"square":true,"revel":false}},"attendance_alert_manager":15,"attendance_alert_employee":5,"industry_id":22,"cancelreason_id":0,"cancelreason_feedback":"","payroll_date":false,"payroll_type":2,"utm_source":"","utm_medium":"","utm_term":"","utm_content":"","utm_campaign":"","is_demo":false,"trial_length":0,"trial_created_at":"","organization_id":0,"business_id":"","created_at":"Mon, 15 May 2017 23:27:45 -0500","updated_at":"Mon, 15 May 2017 23:27:47 -0500","converted_at":false,"is_deactivated":0,"deactivated_at":"0000-00-00 00:00:00","is_deleted":false,"deleted_at":"Wed, 30 Nov -001 00:00:00 -0600","referral_id":0,"is_default_location_address":false,"time_format":0,"timezone_name":"America\/New_York","bad_credit_card":false,"split_shifts":0,"payroll_overtime_multiplier":0,"payroll_hours_max":0,"uses_features":[],"required_features":[],"toggles":["workplace_confirm","workplaces_signup","workchat","workchat-channels","int-cloudelements","employee-modal-refresh","position-view","new_help_center","say_thanks_experiment","scheduler_freemium_lts21_v2"],"employee_count":5,"user_count":5,"has_billing":false,"limited_features":{"shift_acknowledgement":true},"group":"E","ref_status":"paid","owner":{"id":18874592,"name":"S\u00e9bastien Vuong","email":"sebastien.vuong.teamcanada@gmail.com"},"has_saml":false,"place":{"id":1102068,"business_name":"3971 Rue de la Duchesse","address":"3971 Rue de la Duchesse, Laval, QC H7E 5H5, Canada","street_name":"Rue de la Duchesse","street_number":"3971","locality":"Laval","sub_locality":"","region":"QC","postal_code":"H7E 5H5","country":"CA","latitude":45.6209954,"longitude":-73.6752331,"place_type":["street_address"],"place_id":"ChIJy_MQ9UYgyUwRJr5kVwFiaJw","updated_at":"Mon, 15 May 2017 23:27:45 -0500"}},"users":[{"id":18875284,"account_id":1817839,"login_id":9281426,"timezone_id":0,"country_id":233,"migration_id":0,"created_by":0,"role":3,"is_payroll":false,"is_trusted":0,"type":1,"email":"sinriver413@hotmail.com","first_name":"Sebastian","last_name":"Wong","phone_number":"","employee_code":"","avatar":{"url":"https:\/\/avatars.wheniwork.com\/b6d4acff7edc85cc482e6c7030dc596e2b2f5805\/%s","size":"%s"},"password":false,"activated":true,"is_hidden":false,"uuid":"43438d08eb19387830e098bace0d45bf1274d983","notes":"","affiliate":0,"is_private":true,"infotips":"","hours_preferred":0,"hours_max":40,"hourly_rate":0,"alert_settings":{"timeoff":{"sms":false,"email":true},"swaps":{"sms":false,"email":true},"schedule":{"sms":false,"email":true},"reminders":{"sms":false,"email":true},"availability":{"sms":false,"email":true},"new_employee":{"sms":false,"email":true},"attendance":{"sms":false,"email":false},"workchat":{"alerts":true,"badge_icon":true,"in_app":true}},"reminder_time":2,"sleep_start":"23:00:00","sleep_end":"05:00:00","my_positions":[],"is_onboarded":false,"last_login":"Mon, 15 May 2017 23:45:26 -0500","dismissed_at":"","notified_at":"Wed, 30 Nov -001 00:00:00 -0600","invited_at":"","created_at":"Mon, 15 May 2017 23:41:33 -0500","updated_at":"Mon, 15 May 2017 23:43:31 -0500","deleted_at":"","is_deleted":false,"is_active":true,"timezone_name":"America\/New_York","positions":[],"position_quality":[],"position_rates":[],"locations":[2697648],"country_code":"US","is_internal_login":false,"unacknowledged":[],"first_mobile_login":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2N0IjoxODE3ODM5LCJ1c2VyIjoxODg3NTI4NCwiYXBwIjoyMDA5LCJsb2dpbiI6OTI4MTQyNiwiaWF0IjoxNDk0OTA0ODk1LCJqdGkiOiJhYmJkZDA2NS05MTAxLTUyZDItYWU2MC02NmE2MGNjNjJkNGEifQ.hXiIOYcWOR7rbTKmtANRbt1eeHzca-taGl716lpthJw"}],"accounts":[{"id":1817839,"master_id":0,"country_id":233,"agent_id":103,"type":1,"logo":"","company":"SebWong Inc.","subdomain":"sebwonginc","enabled":true,"custom_domain":"","plan_id":-6,"plan_expires":"Wed, 30 Nov -001 00:00:00 -0600","plan_units":0,"plan_type":1,"features":["scheduling","int-basic","acknowledgement","annotations","mobile-alerts","workchat","open-shifts","position-view","sms-alerts","swaps-drops","schedule-builder","schedule-templates","live-chat","long-term-scheduling-21"],"wb_expires":false,"plan_custom":0,"plan_texting":false,"text_credits":25,"timezone_id":9,"place_id":"1102068","place_confirmed":true,"billing_type":0,"tax_exemption":"","mbsy_short_code":"","referral_code":"","ref_plan_id":-6,"ref_employees":5,"notifications":[{"key":"annual_upgrade","show":false},{"key":"legacy_upgrade","show":false},{"key":"trial_upgrade","show":false}],"settings":{"schedule":{"enabled":true,"split_shifts":0,"preferred_hours":true,"shift_acknowledgement":true,"start_of_week":0,"24hour":false,"sort_employees":0,"is_visible":true,"positions_only":false,"open_scheduling":false,"currency":"$"},"timeoff":{"enabled":true,"manager_approval":true,"supervisor_autoapprove":true,"days_notice":0,"is_public":true,"max_hours_per_day":8},"availability":{"enabled":true,"is_public":true},"swaps":{"enabled":true,"manager_approval":true},"conversations":{"enabled":true},"permissions":{"text_credits":0},"social":{"enabled":true},"privacy":{"enabled":false},"workchat":{"enabled":true,"last_enabled_date":"Wed, 11 May 2016 00:00:00 -0500","toggled":null},"clockin":{"enabled":true,"mobile":{"enabled":true,"strict":false,"radius":100},"work":{"enabled":true},"window":15},"payroll":{"enabled":true,"timesheets":true,"start_date":null,"type":0,"hours_max":40,"hours_max_daily":24,"hours_dot_daily":24,"ot_multiplier":1.5,"dbl_multiplier":2,"work_day_start":"00:00","adp_enabled":false,"adp_viewable":false,"is_onboarded":false},"integrations":{"square":true,"revel":false}},"attendance_alert_manager":15,"attendance_alert_employee":5,"industry_id":22,"cancelreason_id":0,"cancelreason_feedback":"","payroll_date":false,"payroll_type":2,"utm_source":"","utm_medium":"","utm_term":"","utm_content":"","utm_campaign":"","is_demo":false,"trial_length":0,"trial_created_at":"","organization_id":0,"business_id":"","created_at":"Mon, 15 May 2017 23:27:45 -0500","updated_at":"Mon, 15 May 2017 23:27:47 -0500","converted_at":false,"is_deactivated":0,"deactivated_at":"0000-00-00 00:00:00","is_deleted":false,"deleted_at":"Wed, 30 Nov -001 00:00:00 -0600","referral_id":0,"is_default_location_address":false,"time_format":0,"timezone_name":"America\/New_York","bad_credit_card":false,"split_shifts":0,"payroll_overtime_multiplier":0,"payroll_hours_max":0,"uses_features":[],"required_features":[],"toggles":["workplace_confirm","workplaces_signup","workchat","workchat-channels","int-cloudelements","employee-modal-refresh","position-view","new_help_center","say_thanks_experiment","scheduler_freemium_lts21_v2"],"employee_count":5,"user_count":5,"has_billing":false,"limited_features":{"shift_acknowledgement":true},"group":"E","ref_status":"paid","owner":{"id":18874592,"name":"S\u00e9bastien Vuong","email":"sebastien.vuong.teamcanada@gmail.com"},"has_saml":false,"place":{"id":1102068,"business_name":"3971 Rue de la Duchesse","address":"3971 Rue de la Duchesse, Laval, QC H7E 5H5, Canada","street_name":"Rue de la Duchesse","street_number":"3971","locality":"Laval","sub_locality":"","region":"QC","postal_code":"H7E 5H5","country":"CA","latitude":45.6209954,"longitude":-73.6752331,"place_type":["street_address"],"place_id":"ChIJy_MQ9UYgyUwRJr5kVwFiaJw","updated_at":"
*/

// GET ALL USERS
fetch(`${api_link}/2/users`, {
    headers: {
        "W-Token": login_token
    }
})
.then(response => response.json())
.then(data => {console.log(data)});
