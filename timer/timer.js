var start_time = false, end_time = false,  elapsed_time = false, elapsed_minutes = false;
var interval_timer = false, interval = 20*60*1000, progress = 0, paused = false, last_check = false;

function getNow(){
    return (new Date()).getTime();}
function byID(string){
    return document.getElementById(string);}


var num_names = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];

function interval_callback(evt){
    if (paused) { return;}
    var now = getNow();
    if (!(last_check)) last_check = start_time;
    elapsed_time = elapsed_time + (now-last_check);
    var new_minutes = Math.floor(elapsed_time/(60*1000));
    if (elapsed_minutes != new_minutes) {
	minutes_tick(new_minutes);
	elapsed_minutes=new_minutes;}
    last_check = now;
    if (elapsed_time > interval) {
	timer_done(evt);}
    else set_togo(interval-elapsed_time);
}
function minutes_tick(m){}
function set_togo(togo){
    var minutes_togo = Math.ceil(togo/(60*1000));
    var count_elt = byID("countdown_value");
    var count_bar = byID("countdown_progress");
    var numstring = (minutes_togo < 3) ? ("<"+minutes_togo) : (""+minutes_togo);
    count_elt.innerHTML = numstring
    count_bar.style.width=(100*((interval-togo)/interval))+"%";}

function start_timer(evt){
    var app = byID("TIMER_APP");
    if (app.classList.contains("setting"))
	set_timer_interval(false);
    start_time = last_check = getNow();
    elapsed_time = 0;
    elapsed_minutes = 0;
    set_togo(interval);
    if (interval_timer) window.clearInterval(interval_timer);
    interval_timer = window.setInterval(interval_callback,100);
    app.classList.add("running");
}
function pause_timer(evt){
    var app = byID("TIMER_APP");
    paused = getNow();
    app.classList.add("paused");
    app.classList.remove("running");}
function resume_timer(evt){
    var app = byID("TIMER_APP");
    last_check = getNow();
    paused = false;
    app.classList.remove("paused");
    app.classList.add("running");}

function timer_done(evt){
    var timer = interval_timer;
    interval_timer = false;
    if (timer) window.clearInterval(timer);
    set_togo(0);
    var app = byID("TIMER_APP");
    app.classList.remove("running");
    app.classList.remove("paused");
    elapsed_time=paused=false;}

function set_timer(evt){
    byID("TIMER_APP").classList.add("setting");
    byID("TIMER_INPUT").focus();}

function timer_set(evt){
    byID("TIMER_APP").classList.remove("setting");
    set_timer_interval(false);}

function set_timer_interval(minutes)
{
    if (!(minutes)) {
	var input_elt = byID("TIMER_INPUT");	
	minutes = input_elt.value;}
    interval = minutes*60*1000;
    byID("TIMER_APP").classList.remove("setting");
    if (elapsed_time<interval)
	set_togo(interval-elapsed_time);
    else timer_done(false);}
