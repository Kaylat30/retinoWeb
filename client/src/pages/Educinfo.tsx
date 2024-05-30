import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';


const DiabeticTypesInfo = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Types of Diabetics</h2>
      <h2>What is diabetes?</h2>
      <p>
        Diabetes is a condition that happens when your blood sugar (glucose) is too high. It develops when your pancreas doesn’t make enough insulin or any at all, or when your body isn’t responding to the effects of insulin properly. Diabetes affects people of all ages. Most forms of diabetes are chronic (lifelong), and all forms are manageable with medications and/or lifestyle changes.
        Glucose (sugar) mainly comes from carbohydrates in your food and drinks. It’s your body’s go-to source of energy. Your blood carries glucose to all your body’s cells to use for energy.
        When glucose is in your bloodstream, it needs help — a “key” — to reach its final destination. This key is insulin (a hormone). If your pancreas isn’t making enough insulin or your body isn’t using it properly, glucose builds up in your bloodstream, causing high blood sugar (hyperglycemia).
        Over time, having consistently high blood glucose can cause health problems, such as heart disease, nerve damage and eye issues.
        The technical name for diabetes is diabetes mellitus. Another condition shares the term “diabetes” — diabetes insipidus — but they’re distinct. They share the name “diabetes” because they both cause increased thirst and frequent urination. Diabetes insipidus is much rarer than diabetes mellitus.
      </p>
      <h2>What are the types of diabetes?</h2>
      <p>There are several types of diabetes. The most common forms include:</p>
      
      <ul>
        <li>Type 2 diabetes: With this type, your body doesn’t make enough insulin and/or your body’s cells don’t respond normally to the insulin (insulin resistance). This is the most common type of diabetes. It mainly affects adults, but children can have it as well.</li>
        <li>Prediabetes: This type is the stage before Type 2 diabetes. Your blood glucose levels are higher than normal but not high enough to be officially diagnosed with Type 2 diabetes.</li>
        <li>Type 1 diabetes: This type is an autoimmune disease in which your immune system attacks and destroys insulin-producing cells in your pancreas for unknown reasons. Up to 10% of people who have diabetes have Type 1. It’s usually diagnosed in children and young adults, but it can develop at any age.</li>
        <li>Gestational diabetes: This type develops in some people during pregnancy. Gestational diabetes usually goes away after pregnancy. However, if you have gestational diabetes, you’re at a higher risk of developing Type 2 diabetes later in life.</li>
      </ul>
      <p>Other types of diabetes include:</p>
  
      <ul>
        <li>Type 3c diabetes: This form of diabetes happens when your pancreas experiences damage (other than autoimmune damage), which affects its ability to produce insulin. Pancreatitis, pancreatic cancer, cystic fibrosis and hemochromatosis can all lead to pancreas damage that causes diabetes. Having your pancreas removed (pancreatectomy) also results in Type 3c.</li>
        <li>Latent autoimmune diabetes in adults (LADA): Like Type 1 diabetes, LADA also results from an autoimmune reaction, but it develops much more slowly than Type 1. People diagnosed with LADA are usually over the age of 30.</li>
        <li>Maturity-onset diabetes of the young (MODY): MODY, also called monogenic diabetes, happens due to an inherited genetic mutation that affects how your body makes and uses insulin. There are currently over 10 different types of MODY. It affects up to 5% of people with diabetes and commonly runs in families.</li>
        <li>Neonatal diabetes: This is a rare form of diabetes that occurs within the first six months of life. It’s also a form of monogenic diabetes. About 50% of babies with neonatal diabetes have the lifelong form called permanent neonatal diabetes mellitus. For the other half, the condition disappears within a few months from onset, but it can come back later in life. This is called transient neonatal diabetes mellitus.</li>
        <li>Brittle diabetes: Brittle diabetes is a form of Type 1 diabetes that’s marked by frequent and severe episodes of high and low blood sugar levels. This instability often leads to hospitalization. In rare cases, a pancreas transplant may be necessary to permanently treat brittle diabetes.</li>
      </ul>
    </div>
  );
};

const ManagementandTreatmentInfo = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Management and Treatment.</h2>
      <h2>How is diabetes managed?</h2>
      <p>Diabetes is a complex condition, so its management involves several strategies. In addition, diabetes affects everyone differently, so management plans are highly individualized.</p>
      <h2>The four main aspects of managing diabetes include:</h2>
      <ul>
        <li>Blood sugar monitoring: Monitoring your blood sugar (glucose) is key to determining how well your current treatment plan is working. It gives you information on how to manage your diabetes on a daily — and sometimes even hourly — basis. You can monitor your levels with frequent checks with a glucose meter and finger stick and/or with a continuous glucose monitor (CGM). You and your healthcare provider will determine the best blood sugar range for you.</li>
        <li>Oral diabetes medications: Oral diabetes medications (taken by mouth) help manage blood sugar levels in people who have diabetes but still produce some insulin — mainly people with Type 2 diabetes and prediabetes. People with gestational diabetes may also need oral medication. There are several different types. Metformin is the most common.</li>
        <li>Insulin: People with Type 1 diabetes need to inject synthetic insulin to live and manage diabetes. Some people with Type 2 diabetes also require insulin. There are several different types of synthetic insulin. They each start to work at different speeds and last in your body for different lengths of time. The four main ways you can take insulin include injectable insulin with a syringe (shot), insulin pens, insulin pumps and rapid-acting inhaled insulin.</li>
        <li>Diet: Meal planning and choosing a healthy diet for you are key aspects of diabetes management, as food greatly impacts blood sugar. If you take insulin, counting carbs in the food and drinks you consume is a large part of management. The amount of carbs you eat determines how much insulin you need at meals. Healthy eating habits can also help you manage your weight and reduce your heart disease risk.</li>
        <li>Exercise: Physical activity increases insulin sensitivity (and helps reduce insulin resistance), so regular exercise is an important part of management for all people with diabetes.</li>
      </ul>
      <h2>Due to the increased risk for heart disease, it’s also important to maintain a healthy:</h2>
      <ul>
        <li>Blood pressure</li>
        <li>Cholesterol</li>
      </ul>
    </div>
  );
};

const SymptomsandCausesInfo = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Symptoms and Causes</h2>
      <h2>What are the symptoms of diabetes?</h2>
      <ul>
        <li>Increased thirst (polydipsia) and dry mouth.</li>
        <li>Frequent urination.</li>
        <li>Fatigue.</li>
        <li>Blurred vision</li>
        <li>Unexplained weight loss.</li>
        <li>Numbness or tingling in your hands or feet.</li>
        <li>Slow-healing sores or cuts.</li>
        <li>Frequent skin and/or vaginal yeast infections.</li>
      </ul>
      <p>It’s important to talk to your healthcare provider if you or your child has these symptoms.</p>
      <h2>Additional details about symptoms per type of diabetes include:</h2>
      <ul>
        <li>Type 1 diabetes: Symptoms of T1D can develop quickly — over a few weeks or months. You may develop additional symptoms that are signs of a severe complication called diabetes-related ketoacidosis (DKA). DKA is life-threatening and requires immediate medical treatment. DKA symptoms include vomiting, stomach pains, fruity-smelling breath and labored breathing.</li>
        <li>Type 2 diabetes and prediabetes: You may not have any symptoms at all, or you may not notice them since they develop slowly. Routine bloodwork may show a high blood sugar level before you recognize symptoms. Another possible sign of prediabetes is darkened skin on certain parts of your body (acanthosis nigricans).</li>
        <li>Gestational diabetes: You typically won’t notice symptoms of gestational diabetes. Your healthcare provider will test you for gestational diabetes between 24 and 28 weeks of pregnancy.</li>
      </ul>
      <h2>What causes diabetes?</h2>
      <p>
        Too much glucose circulating in your bloodstream causes diabetes, regardless of the type. However, the reason why your blood glucose levels are high differs depending on the type of diabetes.
        Causes of diabetes include:
      </p>
      <ul>
        <li>Insulin resistance: Type 2 diabetes and prediabetes happen because your body’s cells can’t properly use insulin (insulin resistance). As a result, your pancreas makes more insulin to try to get glucose into your cells. Eventually, your pancreas can’t keep up, leading to high blood sugar levels (hyperglycemia).</li>
        <li>Autoimmunity: Type 1 diabetes happens because your body’s immune system mistakenly attacks and destroys insulin-producing cells in your pancreas (beta cells). Researchers don’t know why the autoimmune attack happens. However, they think a combination of genetic and environmental factors are involved. The attack may be triggered by viruses and/or other infections.</li>
        <li>Pancreas damage: Type 3c diabetes results from damage to your pancreas from conditions such as pancreatitis, pancreatic cancer, cystic fibrosis and hemochromatosis. Pancreas removal (pancreatectomy) can also cause diabetes.</li>
        <li>Genetics: Specific genetic mutations can lead to forms of diabetes, such as maturity-onset diabetes of the young (MODY) and neonatal diabetes. The role of genetics in Type 1 and Type 2 diabetes isn’t completely understood, but it plays a part in determining a person’s likelihood of developing these conditions.</li>
        <li>Hormones: Certain hormonal conditions, such as acromegaly and Cushing’s syndrome, can cause diabetes because they involve high levels of hormones that counteract insulin.</li>
        <li>Gestational diabetes: Gestational diabetes results from changes in hormone levels during pregnancy. The placenta makes hormones that can lead to insulin resistance in some people.</li>
      </ul>
    </div>
  );
};

export const DiabetesComplicationsInfo = () => (
  <div>
    <p style={{ fontSize: '20px' }}>
      Diabetes can lead to acute (sudden and severe) and long-term complications — mainly due to extreme or prolonged high blood sugar levels.
    </p>
    <p style={{ fontSize: '20px' }}>
      Acute diabetes complications Acute diabetes complications that can be life-threatening include:
    </p>
    <ul>
      <li style={{ fontSize: '20px' }}>
        Hyperosmolar hyperglycemic state (HHS): This complication mainly affects people with Type 2 diabetes. It happens when your blood sugar levels are very high (over 600 milligrams per deciliter or mg/dL) for a long period, leading to severe dehydration and confusion. It requires immediate medical treatment.
      </li>
      <li style={{ fontSize: '20px' }}>
        Diabetes-related ketoacidosis (DKA): This complication mainly affects people with Type 1 diabetes or undiagnosed T1D. It happens when your body doesn’t have enough insulin. If your body doesn’t have insulin, it can’t use glucose for energy, so it breaks down fat instead. This process eventually releases substances called ketones, which turn your blood acidic. This causes labored breathing, vomiting and loss of consciousness. DKA requires immediate medical treatment.
      </li>
      <li style={{ fontSize: '20px' }}>
        Severe low blood sugar (hypoglycemia): Hypoglycemia happens when your blood sugar level drops below the range that’s healthy for you. Severe hypoglycemia is very low blood sugar. It mainly affects people with diabetes who use insulin. Signs include blurred or double vision, clumsiness, disorientation and seizures. It requires treatment with emergency glucagon and/or medical intervention.
      </li>
    </ul>
    <p style={{ fontSize: '20px' }}>Long-term diabetes complications</p>
    <p style={{ fontSize: '20px' }}>
      Blood glucose levels that remain high for too long can damage your body’s tissues and organs. This is mainly due to damage to your blood vessels and nerves, which support your body’s tissues. Cardiovascular (heart and blood vessel) issues are the most common type of long-term diabetes complication. They include:
    </p>
    <ul>
      <li style={{ fontSize: '20px' }}>Coronary artery disease</li>
      <li style={{ fontSize: '20px' }}>Heart attack</li>
      <li style={{ fontSize: '20px' }}>Stroke</li>
      <li style={{ fontSize: '20px' }}>Atherosclerosis</li>
      <li style={{ fontSize: '20px' }}>Nerve damage (neuropathy), which can cause numbness, tingling and/or pain</li>
      <li style={{ fontSize: '20px' }}>Nephropathy, which can lead to kidney failure or the need for dialysis or transplant</li>
      <li style={{ fontSize: '20px' }}>Retinopathy, which can lead to blindness</li>
      <li style={{ fontSize: '20px' }}>Skin infections</li>
    </ul>
  </div>
);

export const LivingWithInfo = () => (
  <div style={{ padding: '20px' }}>
    <p style={{ fontSize: '20px' }}>This is the finance information paragraph.</p>
    <p style={{ fontSize: '20px' }}>If you haven’t been diagnosed with diabetes, you should see a healthcare provider if you have any symptoms of diabetes, such as increased thirst and frequent urination.</p>
    <p style={{ fontSize: '20px' }}>If you have diabetes, you should see your provider who helps you manage diabetes (such as an endocrinologist) regularly.</p>
    <p style={{ fontSize: '20px' }}>A note from Retino.</p>
    <p style={{ fontSize: '20px' }}>Being diagnosed with diabetes is a life-changing event, but it doesn’t mean you can’t live a happy and healthy life. Managing diabetes involves consistent care and diligence. While it’ll likely be very overwhelming at first, over time you’ll get a better grasp on managing the condition and being in tune with your body.</p>
    <p style={{ fontSize: '20px' }}>Be sure to see your healthcare provider(s) regularly. Managing diabetes involves a team effort you’ll want medical professionals, friends, and family on your side. Don’t be afraid to reach out to them if you need help.</p>
  </div>
);

export const DiagnosisandTestsInfo = () => (
  <div style={{ padding: '20px' }}>
    <p style={{ fontSize: '20px' }}>How is diabetes diagnosed?</p>
    <p style={{ fontSize: '20px' }}>Healthcare providers diagnose diabetes by checking your glucose level in a blood test. Three tests can measure your blood glucose level:</p>
    <ul>
      <li style={{ fontSize: '20px' }}>
        Random blood glucose test: “Random” means that you can get this test at any time, regardless of if you’ve fasted.
      </li>
      <li style={{ fontSize: '20px' }}>
        Fasting blood glucose test: For this test, you don’t eat or drink anything except water (fast) for at least eight hours before the test. As food can greatly affect blood sugar, this test allows your provider to see your baseline blood sugar.
      </li>
      <li style={{ fontSize: '20px' }}>
        A1c: This test, also called HbA1C or glycated hemoglobin test, provides your average blood glucose level over the past two to three months.
      </li>
    </ul>
  </div>
);

export const PreventionInfo = () => (
  <div style={{ padding: '20px' }}>
    <p style={{ fontSize: '20px' }}>How can I prevent diabetes?</p>
    <p style={{ fontSize: '20px' }}>
      You can’t prevent autoimmune and genetic forms of diabetes. But there are some steps you can take to lower your risk for developing prediabetes, Type 2 diabetes, and gestational diabetes, including:
    </p>
    <ul>
      <li style={{ fontSize: '20px' }}>Eat a healthy diet, such as the Mediterranean diet.</li>
      <li style={{ fontSize: '20px' }}>Get physically active. Aim for 30 minutes a day at least five days a week.</li>
      <li style={{ fontSize: '20px' }}>Work to achieve a weight that’s healthy for you.</li>
      <li style={{ fontSize: '20px' }}>Manage your stress.</li>
      <li style={{ fontSize: '20px' }}>Limit alcohol intake.</li>
      <li style={{ fontSize: '20px' }}>Get adequate sleep (typically 7 to 9 hours) and seek treatment for sleep disorders.</li>
      <li style={{ fontSize: '20px' }}>Quit smoking</li>
      <li style={{ fontSize: '20px' }}>Take medications as directed by your healthcare provider to manage existing risk factors for heart disease.</li>
    </ul>
    <p style={{ fontSize: '20px' }}>
      It’s important to note that there are some diabetes risk factors you can’t change, such as your genetics/family history, age, and race. Know that Type 2 diabetes is a complex condition that involves many contributing factors.
    </p>
  </div>
);

export const TravelInfo = () => (
  <div style={{ padding: '20px' }}>
    <p>This is the travel information paragraph.</p>
  </div>
);

export const FashionInfo = () => (
  <div style={{ padding: '20px' }}>
    <p>This is the fashion information paragraph.</p>
  </div>
);

export const MusicInfo = () => (
  <div style={{ padding: '20px' }}>
    <p>This is the music information paragraph.</p>
  </div>
);


// Main component that handles rendering based on the provided paragraph parameter
const Educinfo = () => {
  const { text } = useParams();
  const navigate = useNavigate();

  const renderParagraph = () => {
    switch (text) {
      case 'Diabetic Types':
        return <DiabeticTypesInfo/>;
      case 'Management and Treatment.':
        return <ManagementandTreatmentInfo />;
      case 'Symptoms and Causes':
        return <SymptomsandCausesInfo />;
      case 'Diabetes Complications':
        return <DiabetesComplicationsInfo />;
      case 'Living With':
        return <LivingWithInfo />;
      case 'Diagnosis and Tests':
        return <DiagnosisandTestsInfo />;
      case 'Prevention':
        return <PreventionInfo />;
      case 'Travel':
        return <TravelInfo />;
      case 'Fashion':
        return <FashionInfo />;
      case 'Music':
        return <MusicInfo />;
      default:
        return null;
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <button style={{ margin: 20, background: 'none', border: 'none' }} onClick={handleGoBack}>
        <IoArrowBack size={24} color="black"/>
      </button>
      <div>
        {renderParagraph()}
      </div>
    </div>
  );
};

export default Educinfo;
