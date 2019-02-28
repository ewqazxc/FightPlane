/**
 * 子类 bullet 子弹对象
 * */
var Bullet = function (opts) {
	var opts = opts || {};
	Element.call(this, opts);
	this.icon = opts.icon;
};
//继承element的方法
Bullet.prototype = new Element();

/**
 * 向上飞行 方法
 * */
Bullet.prototype.fly = function() {
	this.move(0,-this.speed);
	return this;
};

/**
 * 判断是否碰撞
 * @return Boolean
 * */
Bullet.prototype.hasCrash = function(target) {
	var crash = false;
	//判断四周有无空隙
	if(!(this.x + this.width < target.x)&&
			!(target.x + target.width < this.x)&&
		 !(this.y + this.height <target.y)&&
		  !(target.y +target.height <this.y)) {
		  	crash = true;  //发生碰撞
		  }
		  return crash;
};

//draw 方法
Bullet.prototype.draw = function() {
  // 绘画一个线条
//	console.log(this.icon);
  context.drawImage(this.icon, this.x, this.y, this.width, this.height);
  return this;
};