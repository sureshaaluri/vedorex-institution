import type { Schema, Struct } from '@strapi/strapi';

export interface AboutChooseCard extends Struct.ComponentSchema {
  collectionName: 'components_about_choose_cards';
  info: {
    displayName: 'Choose_Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_text: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AboutEdtechSection extends Struct.ComponentSchema {
  collectionName: 'components_about_edtech_sections';
  info: {
    displayName: 'Edtech Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'about.feature-item', true>;
    heading: Schema.Attribute.Text;
    section_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    tag_label: Schema.Attribute.String;
  };
}

export interface AboutFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_about_feature_items';
  info: {
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface AboutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_about_hero_sections';
  info: {
    displayName: 'hero-section';
  };
  attributes: {
    background_Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    OverlayColor: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AboutItemsStats extends Struct.ComponentSchema {
  collectionName: 'components_about_items_stats';
  info: {
    displayName: 'Items_stats';
  };
  attributes: {};
}

export interface AboutMentorItem extends Struct.ComponentSchema {
  collectionName: 'components_about_mentor_items';
  info: {
    displayName: 'Mentor Item';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface AboutMentorsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_mentors_sections';
  info: {
    displayName: 'Mentors Section';
  };
  attributes: {
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.Text;
    main_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mentors: Schema.Attribute.Component<'about.mentor-item', true>;
  };
}

export interface AboutStatItem extends Struct.ComponentSchema {
  collectionName: 'components_about_stat_items';
  info: {
    displayName: 'Stat Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface AboutStatsItem extends Struct.ComponentSchema {
  collectionName: 'components_about_stats_items';
  info: {
    displayName: 'stats_item';
  };
  attributes: {
    lable: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface AboutStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_stats_sections';
  info: {
    displayName: 'Stats Section';
  };
  attributes: {
    heading: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'about.stats-item', true>;
    stats: Schema.Attribute.Component<'about.stat-item', true>;
    tag_label: Schema.Attribute.String;
  };
}

export interface AboutWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_about_why_chooseuses';
  info: {
    displayName: 'Why_ChooseUs';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about.choose-card', true>;
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface ContactContactCard extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_cards';
  info: {
    displayName: 'ContactCard';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lines: Schema.Attribute.Text;
    tag_label: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactContactForm extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_forms';
  info: {
    displayName: 'ContactForm';
  };
  attributes: {
    button_text: Schema.Attribute.String;
    course_placeholder: Schema.Attribute.String;
    emailaddress_placeholder: Schema.Attribute.String;
    Firstname_placeholder: Schema.Attribute.String;
    heading: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lastname_placeholder: Schema.Attribute.String;
    PhoneNumber_placeholder: Schema.Attribute.String;
    tag_label: Schema.Attribute.String;
  };
}

export interface ContactContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_infos';
  info: {
    displayName: 'ContactInfo';
  };
  attributes: {
    cards: Schema.Attribute.Component<'contact.contact-card', true>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface ContactHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_hero_sections';
  info: {
    displayName: 'Hero_section';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Description: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    overlay_Color: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface ContactMapSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_map_sections';
  info: {
    displayName: 'Map_Section';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String;
    map_url: Schema.Attribute.Text;
  };
}

export interface CoursesCourseCard extends Struct.ComponentSchema {
  collectionName: 'components_courses_course_cards';
  info: {
    displayName: 'Course_Card';
  };
  attributes: {
    badge_text: Schema.Attribute.String;
    badgecolor: Schema.Attribute.String;
    buttontext: Schema.Attribute.String;
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    is_featured: Schema.Attribute.Boolean;
    rating: Schema.Attribute.String;
    sessions: Schema.Attribute.String;
    students: Schema.Attribute.String;
    title: Schema.Attribute.String;
    topics: Schema.Attribute.Text;
  };
}

export interface CoursesCourseCrds extends Struct.ComponentSchema {
  collectionName: 'components_courses_course_crds';
  info: {
    displayName: 'Course_crds';
  };
  attributes: {
    courses: Schema.Attribute.Component<'courses.course-card', true>;
  };
}

export interface CoursesHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_courses_hero_banners';
  info: {
    displayName: 'Hero_Banner';
  };
  attributes: {};
}

export interface CoursesLearningPath extends Struct.ComponentSchema {
  collectionName: 'components_courses_learning_paths';
  info: {
    displayName: 'Learning_Path';
  };
  attributes: {
    steps: Schema.Attribute.Component<'courses.new-path-step', true>;
    tag_label: Schema.Attribute.String;
  };
}

export interface CoursesNewPathStep extends Struct.ComponentSchema {
  collectionName: 'components_courses_new_path_steps';
  info: {
    displayName: ' new _PathStep';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface CoursesStatItem extends Struct.ComponentSchema {
  collectionName: 'components_courses_stat_items';
  info: {
    displayName: 'Stat_Item';
  };
  attributes: {};
}

export interface ElementLink extends Struct.ComponentSchema {
  collectionName: 'components_element_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface ElementLogo extends Struct.ComponentSchema {
  collectionName: 'components_element_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface FooterContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_infos';
  info: {
    displayName: 'contact_info';
  };
  attributes: {
    address: Schema.Attribute.String;
    Email: Schema.Attribute.Email;
    phoneNumber: Schema.Attribute.String;
  };
}

export interface FooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_link_groups';
  info: {
    displayName: 'link-groups';
  };
  attributes: {
    label: Schema.Attribute.String;
    link_groups: Schema.Attribute.Component<'footer.link', true>;
  };
}

export interface NavLinkNavText extends Struct.ComponentSchema {
  collectionName: 'components_nav_link_nav_texts';
  info: {
    displayName: 'nav-text';
  };
  attributes: {
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PathRoutemap extends Struct.ComponentSchema {
  collectionName: 'components_path_routemaps';
  info: {
    displayName: 'routemap';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SectionCategoryCard extends Struct.ComponentSchema {
  collectionName: 'components_section_category_cards';
  info: {
    displayName: 'category-card';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    stat_lable_price: Schema.Attribute.String;
    stat_url: Schema.Attribute.String;
  };
}

export interface SectionCourseCard extends Struct.ComponentSchema {
  collectionName: 'components_section_course_cards';
  info: {
    displayName: 'course-card';
  };
  attributes: {
    courese_url: Schema.Attribute.String;
    course_btn: Schema.Attribute.String;
    lessons: Schema.Attribute.Integer;
    level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    >;
    name: Schema.Attribute.String;
    rating: Schema.Attribute.Integer;
    students: Schema.Attribute.Integer;
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionCourseCategories extends Struct.ComponentSchema {
  collectionName: 'components_section_course_categories';
  info: {
    displayName: 'course-categories';
  };
  attributes: {
    CategoryCard: Schema.Attribute.Component<'section.category-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCourseHighlight extends Struct.ComponentSchema {
  collectionName: 'components_section_course_highlights';
  info: {
    displayName: 'course-highlight';
  };
  attributes: {
    description: Schema.Attribute.String;
    feature: Schema.Attribute.Component<'section.feature', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCta extends Struct.ComponentSchema {
  collectionName: 'components_section_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    Button: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface SectionFeature extends Struct.ComponentSchema {
  collectionName: 'components_section_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
  };
}

export interface SectionFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_section_feature_cards';
  info: {
    displayName: 'feature-card';
  };
  attributes: {
    description: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_label: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface SectionHero extends Struct.ComponentSchema {
  collectionName: 'components_section_heroes';
  info: {
    displayName: 'slider';
  };
  attributes: {
    description: Schema.Attribute.String;
    highlighted_text: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primary_btn_label: Schema.Attribute.String;
    primary_btn_url: Schema.Attribute.String;
    secondary_btn_label: Schema.Attribute.String;
    secondary_btn_url: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'section.stats', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_section_hero_sliders';
  info: {
    displayName: 'banner';
  };
  attributes: {
    slider: Schema.Attribute.Component<'section.hero', true>;
  };
}

export interface SectionLearningpath extends Struct.ComponentSchema {
  collectionName: 'components_section_learningpaths';
  info: {
    displayName: 'learningpath';
  };
  attributes: {
    routepath: Schema.Attribute.Component<'path.routemap', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionStats extends Struct.ComponentSchema {
  collectionName: 'components_section_stats';
  info: {
    displayName: 'stats';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface SectionTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    TestimonialsCard: Schema.Attribute.Component<
      'section.testimonials-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionTestimonialsCard extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonials_cards';
  info: {
    displayName: 'testimonials-card';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.String;
    rating: Schema.Attribute.Integer;
    role: Schema.Attribute.String;
  };
}

export interface SectionTopCourses extends Struct.ComponentSchema {
  collectionName: 'components_section_top_courses';
  info: {
    displayName: 'top-courses';
  };
  attributes: {
    coursecard: Schema.Attribute.Component<'section.course-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_section_why_choose_uses';
  info: {
    displayName: 'why-choose-us';
  };
  attributes: {
    featurecard: Schema.Attribute.Component<'section.feature-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.choose-card': AboutChooseCard;
      'about.edtech-section': AboutEdtechSection;
      'about.feature-item': AboutFeatureItem;
      'about.hero-section': AboutHeroSection;
      'about.items-stats': AboutItemsStats;
      'about.mentor-item': AboutMentorItem;
      'about.mentors-section': AboutMentorsSection;
      'about.stat-item': AboutStatItem;
      'about.stats-item': AboutStatsItem;
      'about.stats-section': AboutStatsSection;
      'about.why-choose-us': AboutWhyChooseUs;
      'contact.contact-card': ContactContactCard;
      'contact.contact-form': ContactContactForm;
      'contact.contact-info': ContactContactInfo;
      'contact.hero-section': ContactHeroSection;
      'contact.map-section': ContactMapSection;
      'courses.course-card': CoursesCourseCard;
      'courses.course-crds': CoursesCourseCrds;
      'courses.hero-banner': CoursesHeroBanner;
      'courses.learning-path': CoursesLearningPath;
      'courses.new-path-step': CoursesNewPathStep;
      'courses.stat-item': CoursesStatItem;
      'element.link': ElementLink;
      'element.logo': ElementLogo;
      'footer.contact-info': FooterContactInfo;
      'footer.link': FooterLink;
      'footer.link-group': FooterLinkGroup;
      'nav-link.nav-text': NavLinkNavText;
      'path.routemap': PathRoutemap;
      'section.category-card': SectionCategoryCard;
      'section.course-card': SectionCourseCard;
      'section.course-categories': SectionCourseCategories;
      'section.course-highlight': SectionCourseHighlight;
      'section.cta': SectionCta;
      'section.feature': SectionFeature;
      'section.feature-card': SectionFeatureCard;
      'section.hero': SectionHero;
      'section.hero-slider': SectionHeroSlider;
      'section.learningpath': SectionLearningpath;
      'section.stats': SectionStats;
      'section.testimonials': SectionTestimonials;
      'section.testimonials-card': SectionTestimonialsCard;
      'section.top-courses': SectionTopCourses;
      'section.why-choose-us': SectionWhyChooseUs;
    }
  }
}
