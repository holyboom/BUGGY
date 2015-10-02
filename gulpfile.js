// โหลด package "gulp" มาใช้ (บรรทัดนี้ต้องใส่เสมอ)
var gulp = require('gulp');
 
// โหลด package "gulp-ruby-sass" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
var sass = require('gulp-ruby-sass');
 
// เพิ่ม sass ให้ทำพร้อมกับ default task
gulp.task('default', ['sass'], function() {
    // ระบุว่า default task ทำอะไร (เว้นไว้ก่อน)
});