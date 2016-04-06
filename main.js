/**
 * Created by Administrator on 2016/4/5.
 */
/**
 *基于任务22，参考示例图，将二叉树变成了多叉树，并且每一个节点中带有内容
 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
 增加一个输入框及一个“查询”按钮，点击按钮时，开始在树中以动画形式查找节点内容和输入框中内容一致的节点，找到后以特殊样式显示该节点，找不到的话给出找不到的提示。查询过程中的展示过程和遍历过程保持一致
 */


//function treeNode(value){
//    this.value=value;
//    this.child=null;
//    this.nextSibling=null;
//}
function $(id){
    return document.getElementById(id);
}
$('bfs-btn').addEventListener('click',bfsTree,false);
$('dfs-btn').addEventListener('click',dfsTree,false);
$('search-btn').addEventListener('click',search,false);
var node=$('container').childNodes[1];
var nodeList=[];
var bfsIndex=0;
var flag=true;
function bfsTree(){
    if(flag==true){
        nodeList=[];
        bfs(node);
        render();
    }

}
function dfsTree(){
    if(flag==true){
        nodeList=[];
        dfs(node);
        render();
    }
}
//广搜
function bfs(node){
    if(node){
        nodeList.push(node);
        bfs(node.nextElementSibling);
        node=nodeList[bfsIndex++];
        bfs(node.firstElementChild);
    }
}
//深搜
function dfs(node){

    if(node){
        nodeList.push(node);
        for(var i=0;i<node.children.length;i++){
            dfs(node.children[i]);
        }
    }
}
//查找内容
function search(){
    if(flag==true){
        nodeList=[];
        var res=getInput();
        if(res==""){alert('请输入值');return;}
        dfs(node);
        render(res);
    }


}
//处理输入内容
function getInput(){
    var s=$('search-text').value.trim();
    return s;
}
//render
function render(input){
    flag=false;
    var res=setInterval(run,500);
    var i=0;
    if(input==undefined){
        function run(){
            for(var j=0;j<nodeList.length;j++){
                if(j==i){
                    nodeList[j].style.background="red";
                }else {
                    nodeList[j].style.background="white";
                }
            }
            i++;
            if(i>nodeList.length+1){ flag=true;clearInterval(res);}
        }
    }else {
        function run(){
            for(var j=0;j<nodeList.length;j++){
                console.log(j,nodeList[j].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, ""),input);
                if(j==i){
                    if(nodeList[j].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == input.replace(/(^\s*)|(\s*$)/g, "")){
                        nodeList[j].style.background="blue";
                        { alert("找到啦");flag=true;clearInterval(res);}
                    }else{
                        nodeList[j].style.background="red";
                    }

                }else {
                    nodeList[j].style.background="white";
                }
            }
            i++;
            if(i>nodeList.length+1){ alert("没找到");flag=true;clearInterval(res);}
        }
    }

}
