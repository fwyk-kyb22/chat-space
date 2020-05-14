FactoryBot.define do
  factory :message do
    content  {Faker::Lorem.sentence}
    image    {File.open("#{Rails.root}/public/images/test_image.jpg.png")}  
    user
    group
  end
end