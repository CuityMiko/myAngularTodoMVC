(function (angular) {
	'use strict';
	//声明模块
	var myapp=angular.module('todoMvcApp',[]);
	//声明控制器
	myapp.controller('MainController',['$scope','$location',function($scope,$location){
		//输入内容
		$scope.content='';
		//内容列表
		$scope.todos=[
			{id:1,content:'学习',completed:false,deleted:false},
			{id:2,content:'吃饭',completed:true,deleted:false}
		]
		//获取当前页面上显示的总数
		$scope.total=$scope.todos.length;
		//添加
		$scope.todo=function(){
			if($scope.content){
				//内容列表追加内容
				$scope.todos.push({
					id:$scope.todos.length+1,
					content:$scope.content,
					completed:false,deleted:false
				})
				//清空输入值
				$scope.content='';
				$scope.total++;
			}
		};
		//删除
		$scope.delete=function(id){
			//$scope.todos.splice(1,1) -> 数组删除 从第几个元素开始删除几个元素，返回被删除的元素数组
			for(var i=0;i<$scope.todos.length;i++){
				if(id===$scope.todos[i].id){
					$scope.todos[i].deleted=true;
					break;
				}
			}
			$scope.total--;
		};
		//是否显示删除所有已完成的
		$scope.ishow=function(){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed && !$scope.todos[i].deleted){
					return true;
				}
			}
			return false;
		};
		//删除所有已完成的
		$scope.deleteAll=function(){
			var _num=0;
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed && !$scope.todos[i].deleted){
					$scope.todos[i].deleted=$scope.todos[i].completed;
					_num++;
				}
			}
			$scope.total=$scope.total-_num;
		};
		//双击编辑
		$scope.editingid=-1; //获取当前正在编辑的Id
		$scope.editing=function(id,completed){
			if(!completed)
				$scope.editingid=id;
		}
		//完成编辑
		$scope.completedEdit=function(){
			$scope.editingid=-1;
		}
		//改变全选反选状态
		var _checkall=false;
		$scope.checkall=false;
		$scope.changeCheckStatus=function(flag){
			if(1===flag){ //点击大按钮
				_checkall=!_checkall;
				$scope.checkall=_checkall;
				for(var i=0;i<$scope.todos.length;i++){
					if(!$scope.todos[i].deleted){
						$scope.todos[i].completed=$scope.checkall;
					}
				}
			}else{ //点击列表按钮
				var _statusflag=false;
				for(var i=0;i<$scope.todos.length;i++){
					if($scope.todos[i].completed && !$scope.todos[i].deleted){
						_statusflag=true;
					}else{
						_statusflag=false;
						break;
					}
				}
				$scope.checkall=_statusflag;
			}
		}
		//切换状态
		//获取状态值
		$scope.condition={};
		//将$location服务赋值给$scope成员从而监视$location的变化
		$location.path() //拿到url中的锚点的变化
		$scope.$location=$location;
		$scope.cururl='#/';
		$scope.$watch('$location.url()',function(now,old){
			switch (decodeURIComponent(now)) {
				case '#/active': 
					$scope.condition={completed:false,deleted:false};
					break;
				case '#/completed':
					$scope.condition={completed:true,deleted:false};
					break;
				default:
					$scope.condition={deleted:false};
					break;
			}
			if(now)
				$scope.cururl=decodeURIComponent(now);
		})
		//由于filter是模糊查询，则创建自定义比较函数
		$scope.compare=function(source,target){
			return source===target;
		}
	}])

})(angular);
