import com.wanghan.dao.RestMapper;
import com.wanghan.dao.ScenicMapper;
import com.wanghan.pojo.Rest;
import com.wanghan.pojo.Scenic;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import com.wanghan.utils.JWTUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Map;

public class Test {
    @org.junit.Test
    public void test(){
        String str=";9f0aa1287496853b5b8a8f3d2ae7e044,";
        String[] arr=str.split(";");
    }
    @org.junit.Test
    public void testScenic(){
        String str="4ae298f94a61f168014a6266f4be0045,7f33afeaaf82ca46049c2d374c61a836,c357c1043fc6c345013fd1b508971c8b,170,;9f0aa1287496853b5b8a8f3d2ae7e044,cbafefdaf2a70caceb0a714a004ba190,6f01d08d433213fce1dfe52b80f7d76b,";
        String[] arr=str.split(";");
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        ScenicMapper mapper=context.getBean("scenicMapper",ScenicMapper.class);
        List<Map<String,Object>> lists=mapper.getDataSource();
        for (Map s:lists){
            System.out.println(s);
        }
    }
    @org.junit.Test
    public void testRest(){
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        RestMapper mapper=context.getBean("restMapper", RestMapper.class);
        List<Map<String,Object>> lists=mapper.getDataSource();
        for (Map s:lists){
            System.out.println(s);
        }
    }
    @org.junit.Test
    public void testJWT(){
        System.out.println(JWTUtils.parseJWT(JWTUtils.createJWT(3,"dsads")));
    }
}
