import com.wanghan.dao.RestMapper;
import com.wanghan.dao.ScenicMapper;
import com.wanghan.pojo.Rest;
import com.wanghan.pojo.Scenic;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Map;

public class Test {
    @org.junit.Test
    public void test(){
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService mapper=context.getBean("userServiceImpl", UserService.class);
        User u=new User("wang2han","wanghan2pwd","2,4,5,6","/ret/dsfs");
        System.out.println(mapper.selectPwdByName("wanghan"));
    }
    @org.junit.Test
    public void testScenic(){
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        ScenicMapper mapper=context.getBean("scenicMapper",ScenicMapper.class);
        List<Map<String,String>> lists=mapper.getScenics();
        for (Map s:lists){
            System.out.println(s.get("name_cn"));
        }
    }
    @org.junit.Test
    public void testRest(){
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        RestMapper mapper=context.getBean("restMapper", RestMapper.class);
        List<Map<String,String>> lists=mapper.getRests();
        for (Map s:lists){
            System.out.println(s.get("name_cn"));
        }
    }
}
