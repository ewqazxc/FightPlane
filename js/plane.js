/**
 * 子类 plane 飞机
 * 继承 element 
 * 依赖bullet
 * */
var Plane = function(opts) {
var opts = opts || {};
//调用父类方法
Element.call(this,opts);
//特有属性
this.status = 'normal';
this.icon = opts.icon;
//子弹相关
this.bullets = [];
this.bulletSize = opts.bulletSize;
this.bulletSpeed = opts.bulletSpeed;
this.bulletIcon = opts.bulletIcon;
//this.shootSound = opts.shootSound;
//爆炸相关
  this.boomIcon = opts.boomIcon;
  this.boomCount = 0;
  	console.log(this.boomIcon);
};

//继承element 方法
Plane.prototype = new Element();
/**
 * 方法：hashit 判断是否碰撞
 * @param {target} target 目标元素实例
 * */
Plane.prototype.hasCrash = function(target) {
	var crash = false;
	//判断四周空隙
		if(!(this.x + this.width < target.x)&&
			 !(target.x + target.width < this.x)&&
		   !(this.y + this.height < target.y)&&
		   !(target.y +target.height < this.y)) {
		  	crash = true;  //发生碰撞
		  }
		  return crash;
};
/**
 * 方法 hashit 是否击中当前元素
 * @param {target} target 目标元素实例
 * */
Plane.prototype.hasHit = function(target) {
	var bullets = this.bullets;
	var hasHit = false;
	for(var i = bullets.length - 1;i >= 0; i--){
		//如果子弹击中敌机，则销毁子弹
		if(bullets[i].hasCrash(target)){
			//清除子弹实例
			this.bullets.splice(i,1);
			hasHit = true;
			break;
		}
	}
	return hasHit;
};

/**
 * 方法： setPosition 修改飞机当前位置
 * */
Plane.prototype.setPosition = function(newPlaneX,newPlaneY) {
	this.x = newPlaneX;
	this.y = newPlaneY;
	return this;
};

/**
 * 方法： starShoot 
 * */
Plane.prototype.startShoot = function() {
	var self = this;
	var bulletWidth = this.bulletSize.width;
	var bulletHeight = this.bulletSize.height;
	//定时发射子弹
	this.shootingInterval = setInterval(function() {
		//创建子弹，子弹位置居中射出
		var bulletX = self.x + self.width / 2 - bulletWidth / 2;
		var bulletY = self.y - bulletHeight;
		//创建子弹
		self.bullets.push(new Bullet({
			x: bulletX,
			y: bulletY,
			width: bulletWidth,
			height: bulletHeight,
			speed: self.bulletSpeed,
			icon: self.bulletIcon,
		}));
	},200);
};

//drawBullets()
Plane.prototype.drawBullets = function() {
	var bullets = this.bullets;
	var i = bullets.length;
	while(i--){
		var bullet = bullets[i];
		//更新子弹位置
		bullet.fly();  //更新绘制耦合
		//超出边界消失
		if(bullet.y <=0) {
			bullets.splice(i,1);
		}else {
			//未超出则绘画
//			  console.log(bullets);
			bullet.draw();
		}
	}
};

/**
 * booming 爆炸中
 * */
Plane.prototype.booming = function() {
	this.status = 'booming';
	this.boomCount += 1;
	if(this.boomCount > 10) {
		this.status = 'boomed';
		clearInterval(this.shooting);
	}
}

//draw()
Plane.prototype.draw = function() {
	//绘制飞机
	switch(this.status) {
		case 'booming':
		context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
		break;
		default:
		context.drawImage(this.icon, this.x, this.y, this.width, this.height);
		break;
	}
	//绘制子弹
	this.drawBullets();
	return this;
};

