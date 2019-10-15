// 检测邮箱和手机号
function execPhoneEmail(phone, email, that) {
    if (
        !phone.match(
            /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        )
    ) {
        that.$message({
            message: "请输入正确的手机号",
            type: "info"
        });
        return false;
    } else if (!email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        that.$message({
            message: "请输入正确的邮箱",
            type: "info"
        });
        return false;
    }
    return true;
}
// 判断是否是管理员
function isSuperAuth(that) {
    if (that.$store.state.userInfo.superAuth != '1') {
        that.$message({
            message: '权限不足，请联系管理员',
            type: 'info'
        });
        return false;
    }
    return true;
}
export {
    execPhoneEmail,
    isSuperAuth
}