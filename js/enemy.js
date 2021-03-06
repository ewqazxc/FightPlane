/**
 * 子类 Enmey 射击目标对象
 * */
var Enemy = function (opts) {
	var opts = opts || {};
	//调用父类方法
	Element.call(this,opts);
	
	//特有属性状态和图标
	this.status = 'normal';
	this.icon = opts.icon;
	this.live = opts.live;
	this.type = opts.type;
	//特有属性，爆炸相关
	this.boomIcon = opts.boomIcon;
	this.boomCount = 0;
};
//继承Element 的方法
Enemy.prototype = new Element();
/**
 * 方法：down 向下移动一个身位
 * */
Enemy.prototype.down = function () {
	this.move(0,this.speed);
};

Enemy.prototype.booming = function() {
	//设置状态为booming
	this.status = 'booming';
	this.boomCount += 1;
	//如果已经booming六次，则设为boomed
	if(this.boomCount > 6) {
		this.status = 'boomed';
	}
}

/**
 * 方法： draw 
 * */
Enemy.prototype.draw = function() {
//	context.fillRect(this.x,this.y,this.width,this.height);
	//绘制怪兽
	switch(this.status){
    case 'normal':
      context.drawImage(this.icon, this.x, this.y, this.width, this.height);
      // context.fillRect(this.x, this.y, this.width, this.height);
      break;
    case 'booming':
      context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
      break;
	}
}
