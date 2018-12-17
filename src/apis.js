// let pro='/api';
let pro='';//
function getUrl(mes) {
  if(mes==='bind')
  {
    //返回当前用户信息
    return pro+'/bind';
  }
  if(mes==='login')//登陆
  {
    // account: zhangsan  用户名
    // password:12356       密码
    // captcha: 7xd3	   验证码
    return pro+'/waplogin';
  }
  if(mes==='logout'){
    return pro+'/logout';
  }
  if(mes==='getQueueList') //获取当前登录用户的消息列队
  {
    return pro+'/getQueueList';
  }
  if(mes==='getGroupMessage') //获取群聊天记录
  {//参数：grou_id->当前群ID http://localhost/getGroupMessageList?group_id=15&type=group
    return pro+'/getGroupMessageList';
  }
  if(mes==='getUserMessage') //获取私聊聊天记录
  {//user_id-> 当前私聊用户ID http://localhost/getUserMessageList?user_id=12&type=user
    return pro+'/getUserMessageList';
  }
  if(mes==='sendPrivateMessage') //发送聊天信息
  {
    /**请求方式： post
    参数：
     to_user_id:7
     type:user
     content:酒吞**/
    return pro+'/sendPrivateMessage';
  }
  //http://localhost/sendGroupMessage
  if(mes==='sendGroupMessage')
  {
    /**
     * group_id:47
     type:group
     content:SSR
     * **/
    return pro+'/sendGroupMessage';
  }
  /*分组*/
  if(mes==='getTeamList')//获取分组列表
  {
    return pro+'/team';
  }
  if(mes==='add_team_name')
  {//创建分组
    return pro+'/team/add_team_name';
  }
  if(mes==='renameTeam')//修改分组名称
  {//teamId:74 name:3211
    return pro+'/team/renameTeam';
  }
  if(mes==='removeTeam')//删除分组
  {//post  参数：teamId->要删除的分组ID
    return pro+'/team/removeTeam';
  }
  /*群*/
  if(mes==='updateGroupName')//修改群名称
  {//post 参数：id->要修改的群ID，name-> 修改的名字 name:2 _method:PUT 52: 要修改的id
    return pro + '/groups/';
  }
  if(mes==='getGroupList')//获取所有群列表
  {
    //http://localhost/userGroups
    return pro+'/userGroups';
  }
  if(mes==='createChatGroup')
  {
    //post 参数：name=我的新群 http://localhost/groups  name:007 userids:13|11|9 usernames:小红,lw,ronle
    return pro+'/groups';
  }
  if(mes==='getGroupUser') //获取群成员列表
  {//请求方式：get 参数：cgid ->当前群ID
    return pro+'/wap/Group/getGroupUser';
  }
  if(mes==='getOnlineUser')//获取在线用户
  {
    return pro+'/wap/index/getOnlineUser';//
  }
  if(mes==='getfileList')//获取文件列表
  {
    //http://localhost/filelist
    return pro+'/filelist';
  }
  if(mes==='searchUser')//通过用户昵称搜索用户
  {
    //参数key 搜索用户昵称 参数:key=张三
    //http://localhost/team/searchUsers http://localhost/team/searchUsers
    return pro+'/team/searchUsers';
  }
  if(mes==='addTeamUser')//修改用户所在分组
  {
//     请求方式：post
//     参数：teamId->的分组ID
//     teamUser->移动的用户ID
//     current_teamId->当前的分组ID
    return pro+'/wap/Teams/addTeamUser';
  }
  if(mes==='updateGroupName')
  {//请求方式：post 参数：id->要修改的群ID，name-> 修改的名字
    return pro+'/wap/Group/updateGroupName';
  }
  if(mes==='deleteGroup')
  {//删除群：post  参数：url + 73 解散群id  _method:DELETE
    return pro+'/groups/';
  }
  if(mes==='getSelectList')
  {//:get  参数:无
    return pro+'/userlist';
  }
  if(mes==='groupAddUser')
  {
    //添加群成员 http://localhost/groupAddUser id:82 userids:1|2 usernames:小明,小罗
    return pro+'/groupAddUser';
  }
  //http://localhost/groups/user/exit
  if(mes==='exit')
  {
    //group_id:49 要退出群聊id
    return pro+'/groups/user/exit';
  }
  if(mes==='repass')
  {
    //修改密码 oldpassword:1234567 newpassword:123321 renewpassword:123321
    return pro+'/resetPssword';
  }
  //http://localhost/uploadimg
  if(mes==='uploadimg')
  {
    //uploadimg 图片上传
    return pro+'/uploadimg';
  }
  if(mes==='uploadfile')
  {//uploadfile 文件上传
    return pro+'/uploadfile';
  }
  if(mes==='groupWithdraw')
  {//群聊消息撤回
    /**
     * msg_id			撤回的消息ID
    type		      类型
    group_id			群ID**/
    return pro+'/groupWithdraw';
  }
  if(mes==='userWithdraw')
  {//私聊 消息撤回
    /**
     * msg_id	string	撤回的消息ID
    type	string	    类型
    to_user_id			接收人ID**/
    return pro+'/userWithdraw';
  }
  if(mes==='download')
  {
    //文件下载 user_id=用户id  file_id=文件id
    return pro+'/download';
  }
  if(mes==='delfile')
  {//http://localhost/delfile
    return pro+'/delfile';
  }
  if(mes==='loginuser')
  {//获取登录用户信息
    return pro+'/loginuser';
  }
  if(mes==='forwardMessage')
  {
    //转发消息
    //id	 string是	要转发的消息ID
    //type string是	类型
    //to	 string是	转发对象ID，群或用户
    return pro+'/forwardMessage';
  }
  if(mes==='re_avatar')
  {
    //修改用户头像
    return pro+'/team/avatar'
  }
  if(mes==='updateName')
  {//修改昵称 POST  name
    return pro+'/updateName'
  }
}
 export default getUrl;
